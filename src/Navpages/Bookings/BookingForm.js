import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Form, Button, Card, Alert, Row, Col, Badge, Modal, Dropdown, DropdownButton, Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE } from '../../auth';

export default function AssetBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');

  const [confirmStage, setConfirmStage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSearchQuery(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadInitialData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const [assetsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/assets/`, {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
          }),
          fetch(`${API_BASE}/api/v1/categories/`, {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
          }).catch(() => ({ ok: false }))
        ]);

        clearTimeout(timeoutId);

        if (isMounted) {
          if (assetsRes && assetsRes.ok) {
            const assetsData = await assetsRes.json();
            if (assetsData && assetsData.length > 0) {
              setAssets(assetsData);
              const map = new Map();
              assetsData.forEach((a) => {
                if (a.location) map.set(a.location.id, a.location);
              });
              setLocations(Array.from(map.values()));
            } else {
              setAssets([]);
            }
          } else {
            setMsg('Unable to load equipment catalog from backend.');
            setAssets([]);
          }

          if (categoriesRes && categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
          } else {
            setCategories([]);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setMsg('Unable to connect to backend server on port 8030.');
          setAssets([]);
          setCategories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  function toISO(dt) {
    if (!dt) return null;
    return dt.toISOString();
  }

  function openBookingForm(assetId) {
    setSelectedAssetId(assetId);
    setQuantity(1);
    setConfirmStage(false);
    setMsg('');
    setStart(null);
    setEnd(null);
    setPurpose('');
    setFullName('');
    setMobile('');
    setEmail('');
    setAddress('');
    setSelectedLocationId('');
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setErrorMessage('');
    setLoading(false);
    setSearchQuery('');
  }

  function handleInitialSubmit(e) {
    e.preventDefault();
    if (!selectedAssetId) {
      setMsg('Please select an asset to book.');
      return;
    }
    if (!start || !end) {
      setMsg('Please select both start and end date/time.');
      return;
    }
    if (!fullName || !mobile || !email) {
      setMsg('Please fill in all personal details.');
      return;
    }
    setConfirmStage(true);
  }

  async function acceptBooking() {
    const token = await getValidAccessToken();
    if (!token) {
      setMsg('Session expired. Please login again.');
      setConfirmStage(false);
      return;
    }

    const asset = assets.find((a) => String(a.id) === String(selectedAssetId));
    if (!asset) {
      setMsg('Please select a valid equipment to book.');
      setConfirmStage(false);
      return;
    }

    const body = {
      asset_id: asset.id,
      quantity: Number(quantity),
      start_datetime: toISO(start),
      end_datetime: toISO(end),
      purpose: purpose || `Booking for ${fullName}`,
      contact_name: fullName,
      contact_email: email,
      contact_mobile: mobile,
      contact_address: address,
      contact_location_id: selectedLocationId ? Number(selectedLocationId) : null,
    };

    let res;
    try {
      res = await authorizedFetch(`${API_BASE}/api/v1/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (err.message === 'AUTH_REQUIRED') {
        clearTokens();
        setMsg('Session expired. Please login again.');
        setConfirmStage(false);
        return;
      }
      setMsg('Error: ' + (err.message || 'Unable to complete reservation.'));
      setConfirmStage(false);
      return;
    }

    if (res.status === 401) {
      clearTokens();
      setMsg('Session expired. Please login again.');
      setConfirmStage(false);
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setMsg('Booking created successfully (ID: ' + data.id + ')');
      setShowSuccessModal(true);
    } else {
      let t = {};
      try {
        t = await res.json();
      } catch (e) { }

      if (res.status === 400) {
        // Check if it's an overlap error or validation error
        if (typeof t === 'object') {
          if (JSON.stringify(t).includes('overlap')) {
            setErrorMessage("Book after 1 hour. This period of time is already booked.");
            setShowErrorModal(true);
            setConfirmStage(false);
            return;
          }

          const errorMsg = Object.entries(t).map(([k, v]) => `${k}: ${v}`).join(', ');
          setMsg('Error: ' + errorMsg);
          setConfirmStage(false);
          return;
        }
      }

      setMsg('Error: ' + (t.detail || JSON.stringify(t)) + (Object.keys(t).length === 0 ? ` (Status: ${res.status})` : ''));
      setConfirmStage(false);
    }
  }

  function rejectBooking() {
    setConfirmStage(false);
  }

  const summary = useMemo(() => {
    const loc = locations.find((l) => l.id === Number(selectedLocationId));
    const asset = assets.find((a) => a.id === Number(selectedAssetId));
    return {
      asset: asset ? asset.name : '—',
      fullName,
      mobile,
      email,
      address,
      location: loc ? loc.name : '—',
      start,
      end,
      purpose,
      quantity,
    };
  }, [
    assets,
    fullName,
    mobile,
    email,
    address,
    selectedLocationId,
    locations,
    start,
    end,
    purpose,
    selectedAssetId,
    quantity,
  ]);

  const filteredAssets = useMemo(() => {
    let list = assets;

    if (selectedCategoryId) {
      const isParent = categories.some(cat => cat.id === selectedCategoryId);
      if (isParent) {
        list = list.filter(a => a.category && a.category.id === selectedCategoryId);
      } else {
        list = list.filter(a => a.subcategory && a.subcategory.id === selectedCategoryId);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.serial_number && a.serial_number.toLowerCase().includes(q)) ||
        (a.location && a.location.name && a.location.name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [assets, selectedCategoryId, categories, searchQuery]);

  const getStatusClass = (status, available) => {
    if (status?.includes('Available') || available) return 'status-badge-available';
    if (status === 'Pending') return 'status-badge-pending';
    return 'status-badge-unavailable';
  };

  const currentAsset = useMemo(() => {
    return assets.find((a) => a.id === Number(selectedAssetId));
  }, [assets, selectedAssetId]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading equipment catalogue...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {msg && (
        <Alert variant={msg.includes('success') ? 'success' : msg.includes('Error') || msg.includes('Failed') || msg.includes('expired') ? 'danger' : 'info'} className="mb-4">
          {msg}
        </Alert>
      )}

      {!selectedAssetId && (
        <>

          <div className="page-hero-banner">
            <div className="page-hero-badge">
              ✦ INSTANT RESERVATIONS
            </div>
            <h1 className="page-hero-title">Book Equipment</h1>
            <p className="page-hero-subtitle">
              Choose professional gear from our studio inventory, select your rental dates, and reserve in seconds.
            </p>
          </div>


          <div className="catalog-filter-bar d-flex flex-wrap gap-3 align-items-center justify-content-between">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <Button
                variant="light"
                className={`filter-btn ${!selectedCategoryId ? 'filter-btn-active' : ''}`}
                onClick={() => setSelectedCategoryId(null)}
              >
                All Assets
              </Button>

              <div className="vr mx-1 opacity-25 d-none d-sm-block"></div>

              {categories.map(cat => {
                const isAnySubSelected = cat.subcategories && cat.subcategories.some(sub => sub.id === selectedCategoryId);
                const isParentSelected = selectedCategoryId === cat.id;
                const isActive = isAnySubSelected || isParentSelected;

                return (
                  <DropdownButton
                    key={cat.id}
                    variant="light"
                    title={cat.name}
                    className={`filter-dropdown ${isActive ? 'filter-dropdown-active' : ''}`}
                    size="sm"
                    onSelect={(ek) => setSelectedCategoryId(Number(ek))}
                    renderMenuOnMount={true}
                    toggleClassName={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
                  >
                    <Dropdown.Item eventKey={cat.id} active={selectedCategoryId === cat.id}>
                      All {cat.name}
                    </Dropdown.Item>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <>
                        <Dropdown.Divider />
                        {cat.subcategories.map(sub => (
                          <Dropdown.Item
                            key={sub.id}
                            eventKey={sub.id}
                            active={selectedCategoryId === sub.id}
                          >
                            {sub.name}
                          </Dropdown.Item>
                        ))}
                      </>
                    )}
                  </DropdownButton>
                );
              })}
            </div>

            <div className="search-input-wrapper">
              <input
                type="text"
                className="form-control search-input-field"
                placeholder="Search equipment to book..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>


          {(selectedCategoryId || searchQuery) && (
            <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
              <span className="text-muted small">Filtered by:</span>
              {selectedCategoryId && (
                <Badge
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    fontSize: '0.82rem',
                    padding: '0.45em 0.9em',
                    borderRadius: '999px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedCategoryId(null)}
                  title="Clear category filter"
                >
                  Category Active <span className="ms-1 opacity-75">✕</span>
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  bg="secondary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.45em 0.9em',
                    borderRadius: '999px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  "{searchQuery}" <span className="ms-1 opacity-75">✕</span>
                </Badge>
              )}
              <span className="text-muted small ms-auto">
                Showing {filteredAssets.length} of {assets.length} items
              </span>
            </div>
          )}


          <Row className="g-4">
            {filteredAssets.map((asset) => (
              <Col key={asset.id} xs={12} sm={6} lg={4}>
                <Card className="h-100 asset-card">

                  <div className="asset-img-container">
                    {asset.category && (
                      <span className="asset-floating-cat">
                        {asset.category.name}
                      </span>
                    )}

                    <span className={`asset-floating-status ${getStatusClass(asset.status, asset.available)}`}>
                      ● {asset.status || (asset.available ? 'Available' : 'Out of Stock')}
                    </span>

                    {asset.image_url ? (
                      <Card.Img
                        variant="top"
                        src={asset.image_url}
                        className="asset-card-img"
                        alt={asset.name}
                      />
                    ) : (
                      <div className="asset-card-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>No Preview Available</span>
                      </div>
                    )}
                  </div>


                  <Card.Body className="asset-card-body">
                    <Card.Title className="asset-card-title" title={asset.name}>
                      {asset.name}
                    </Card.Title>

                    {asset.serial_number && (
                      <div className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
                        S/N: {asset.serial_number}
                      </div>
                    )}

                    <div className="d-flex align-items-center gap-2 flex-wrap mt-auto pt-2">
                      {asset.location && (
                        <span className="asset-tag-pill location">
                          📍 {asset.location.name}
                        </span>
                      )}
                      {asset.subcategory && (
                        <span className="asset-tag-pill">
                          {asset.subcategory.name}
                        </span>
                      )}
                      {asset.total_quantity && (
                        <span className="asset-tag-pill stock">
                          ⚡ {asset.total_quantity} Units Available
                        </span>
                      )}
                    </div>
                  </Card.Body>


                  <Card.Footer className="asset-card-footer">
                    <button
                      className="btn-card-action btn-card-action-success"
                      onClick={() => openBookingForm(asset.id)}
                    >
                      Book Equipment ⚡
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>


          {filteredAssets.length === 0 && (
            <div className="text-center py-5 my-4 bg-white rounded-4 border p-5 shadow-sm">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <h4 className="fw-bold mb-2">No Equipment Available</h4>
              <p className="text-muted mb-4">
                No items match your selected filter or search term.
              </p>
              <Button
                variant="outline-success"
                className="rounded-pill px-4"
                onClick={() => { setSelectedCategoryId(null); setSearchQuery(''); }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </>
      )}

      {selectedAssetId && !confirmStage && (
        <div className="booking-form-wrapper animate-fade-in">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Button
              variant="light"
              size="sm"
              onClick={() => setSelectedAssetId('')}
              className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 border shadow-sm text-secondary fw-semibold"
            >
              ← Back to Catalogue
            </Button>
            <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill small">
              Step 1 of 2: Reservation
            </span>
          </div>

          <div className="booking-asset-summary-bar">
            <div className="booking-asset-thumb">
              {currentAsset?.image_url ? (
                <img src={currentAsset.image_url} alt={currentAsset?.name} />
              ) : (
                <div style={{ color: '#94a3b8' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-grow-1 min-w-0">
              <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <h5 className="mb-0 fw-bold text-dark text-truncate">{currentAsset?.name || 'Selected Equipment'}</h5>
                <span className={`badge ${getStatusClass(currentAsset?.status, currentAsset?.available)}`} style={{ fontSize: '0.7rem' }}>
                  ● {currentAsset?.status || (currentAsset?.available ? 'Available' : 'Out of Stock')}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted small flex-wrap">
                {currentAsset?.serial_number && <span>S/N: {currentAsset.serial_number}</span>}
                {currentAsset?.location && <span>• 📍 {currentAsset.location.name}</span>}
                {currentAsset?.total_quantity && <span>• ⚡ {currentAsset.total_quantity} Units Total</span>}
              </div>
            </div>
          </div>

          <div className="booking-form-container">
            <div className="mb-3 border-bottom pb-2">
              <div className="booking-section-badge">✦ BOOKING DETAILS</div>
              <h5 className="fw-bold mb-0 text-dark">Reserve This Equipment</h5>
            </div>

            <Form onSubmit={handleInitialSubmit}>
              <Row className="g-2 mb-3">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Quantity *</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={currentAsset?.total_quantity || 1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="booking-input-compact"
                      required
                    />
                    <Form.Text className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      Max available: {currentAsset?.total_quantity || 1}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Pickup Location</Form.Label>
                    <Form.Select
                      value={selectedLocationId}
                      onChange={(e) => setSelectedLocationId(e.target.value)}
                      className="booking-input-compact"
                    >
                      <option value="">Default Location</option>
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-3">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Start Date &amp; Time *</Form.Label>
                    <DatePicker
                      selected={start}
                      onChange={(date) => setStart(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      placeholderText="Select start date"
                      className="form-control booking-input-compact"
                      minDate={new Date()}
                      filterTime={(time) => {
                        const currentDate = new Date();
                        const selectedDate = new Date(time);
                        return currentDate.getTime() < selectedDate.getTime();
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">End Date &amp; Time *</Form.Label>
                    <DatePicker
                      selected={end}
                      onChange={(date) => setEnd(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      placeholderText="Select return date"
                      className="form-control booking-input-compact"
                      minDate={start || new Date()}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-3">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Full Name *</Form.Label>
                    <Form.Control
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Smith"
                      className="booking-input-compact"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Mobile Number *</Form.Label>
                    <Form.Control
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="booking-input-compact"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-3">
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Email Address *</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      type="email"
                      className="booking-input-compact"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-3">
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Purpose / Project Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Shoot details, client name, or project description..."
                      className="booking-input-compact"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-4">
                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="booking-label-compact">Delivery / Studio Address (Optional)</Form.Label>
                    <Form.Control
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Studio room or delivery address"
                      className="booking-input-compact"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex gap-2 justify-content-end pt-2 border-top">
                <Button
                  type="button"
                  variant="light"
                  className="rounded-pill px-4 py-2 fw-semibold text-secondary border"
                  onClick={() => setSelectedAssetId('')}
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  className="btn-card-action btn-card-action-primary rounded-pill px-4 py-2"
                  style={{ width: 'auto' }}
                >
                  Review Reservation →
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {confirmStage && (
        <div className="booking-form-wrapper animate-fade-in">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Button
              variant="light"
              size="sm"
              onClick={rejectBooking}
              className="d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 border shadow-sm text-secondary fw-semibold"
            >
              ← Edit Details
            </Button>
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill small">
              Step 2 of 2: Confirmation
            </span>
          </div>

          <div className="booking-form-container">
            <div className="text-center mb-4">
              <div style={{ fontSize: '2.5rem' }}>📋</div>
              <h4 className="fw-bold text-dark mb-1">Confirm Your Reservation</h4>
              <p className="text-muted small mb-0">Please verify your booking details before final confirmation.</p>
            </div>

            <div className="booking-receipt-box mb-4">
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Equipment</span>
                <span className="booking-receipt-val text-primary fw-bold">{summary.asset}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Reserved Units</span>
                <span className="booking-receipt-val badge bg-primary text-white">{summary.quantity} Unit(s)</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Reserved By</span>
                <span className="booking-receipt-val">{summary.fullName || '—'}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Contact Mobile</span>
                <span className="booking-receipt-val">{summary.mobile || '—'}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Contact Email</span>
                <span className="booking-receipt-val">{summary.email || '—'}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Pickup Location</span>
                <span className="booking-receipt-val">📍 {summary.location}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">Start Date/Time</span>
                <span className="booking-receipt-val">{summary.start ? summary.start.toLocaleString() : '—'}</span>
              </div>
              <div className="booking-receipt-row">
                <span className="booking-receipt-label">End Date/Time</span>
                <span className="booking-receipt-val">{summary.end ? summary.end.toLocaleString() : '—'}</span>
              </div>
              {summary.purpose && (
                <div className="booking-receipt-row">
                  <span className="booking-receipt-label">Purpose</span>
                  <span className="booking-receipt-val">{summary.purpose}</span>
                </div>
              )}
              {summary.address && (
                <div className="booking-receipt-row">
                  <span className="booking-receipt-label">Address</span>
                  <span className="booking-receipt-val">{summary.address}</span>
                </div>
              )}
            </div>

            <div className="d-flex gap-2 justify-content-between pt-2 border-top">
              <Button
                variant="light"
                className="rounded-pill px-4 py-2 fw-semibold text-secondary border"
                onClick={rejectBooking}
              >
                ← Back to Edit
              </Button>
              <button
                className="btn-card-action btn-card-action-success rounded-pill px-4 py-2"
                style={{ width: 'auto' }}
                onClick={acceptBooking}
              >
                Confirm &amp; Reserve Gear ⚡
              </button>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <Modal show={showSuccessModal} centered size="sm" backdrop="static" keyboard={false}>
          <Modal.Body className="text-center p-4">
            <div className="emoji-pop" style={{ fontSize: '3.5rem', marginBottom: '15px' }}>📸</div>
            <h4 className="mb-2" style={{ fontWeight: 'bold', color: '#198754' }}>Confirmed!</h4>
            <p className="text-muted small mb-4">Your asset has been reserved.</p>
            <div className="emoji-pop" style={{ fontSize: '1.5rem', marginBottom: '20px', animationDelay: '0.2s' }}>✨ 🎥 ✨</div>
            <Button
              variant="success"
              size="sm"
              className="w-100 rounded-pill"
              style={{ fontWeight: '600' }}
              onClick={() => {
                setShowSuccessModal(false);
                setSelectedAssetId('');
                setPurpose('');
                setFullName('');
                setMobile('');
                setEmail('');
                setAddress('');
                setSelectedLocationId('');
                setStart(null);
                setEnd(null);
                setConfirmStage(false);
                navigate('/bookings');
              }}
            >
              OK, Great!
            </Button>
          </Modal.Body>
        </Modal>
      )}

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered backdrop="static" keyboard={false}>
        <Modal.Header className="bg-danger text-white">
          <Modal.Title>Booking Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚠️</div>
          <h5 className="mb-3" style={{ fontWeight: 'bold' }}>Conflict Detected</h5>
          <p className="text-dark" style={{ fontSize: '1.1rem' }}>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
