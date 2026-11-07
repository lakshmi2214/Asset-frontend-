import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Form, Button, Card, Alert, Row, Col, Badge, Modal, Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { authorizedFetch, getValidAccessToken, clearTokens, API_BASE, PROD_BACKEND } from '../../auth';
import { getAssetGroup, getGroupDisplayName, getRelatedAssets } from '../../assetGroups';
import { OLD_DATABASE_ASSETS, OLD_DATABASE_CATEGORIES } from '../../oldDatabaseAssets';

const initialLocations = Array.from(
  new Map(OLD_DATABASE_ASSETS.filter((a) => a.location).map((a) => [a.location.id, a.location])).values()
);

const EQUIPMENT_GROUPS = [
  { id: 'all', label: 'All Equipment' },
  { id: 'camera', label: '📷 Cameras' },
  { id: 'lens', label: '🔍 Lenses' },
  { id: 'audio', label: '🎙️ Mics & Audio' },
  { id: 'lighting', label: '💡 Lighting' },
  { id: 'power', label: '🔋 Batteries & Power' },
  { id: 'storage', label: '💾 Memory Cards' },
  { id: 'tripod', label: '📐 Stands & Supports' },
];

export default function AssetBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assetIdParam = searchParams.get('assetId');
  const [assets, setAssets] = useState(OLD_DATABASE_ASSETS);
  const [locations, setLocations] = useState(initialLocations);
  const [categories, setCategories] = useState(OLD_DATABASE_CATEGORIES);
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const p = categoryParam.toLowerCase();
      if (p.includes('camera')) setSelectedCategoryId('camera');
      else if (p.includes('mic') || p.includes('audio')) setSelectedCategoryId('audio');
      else if (p.includes('battery') || p.includes('power')) setSelectedCategoryId('power');
      else if (p.includes('lens')) setSelectedCategoryId('lens');
      else if (p.includes('card') || p.includes('storage') || p.includes('media')) setSelectedCategoryId('storage');
      else setSearchQuery(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadInitialData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        let assetsData = null;
        let categoriesData = null;

        try {
          const [assetsRes, categoriesRes] = await Promise.all([
            fetch(`${API_BASE}/api/v1/assets/`, {
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal
            }).catch(() => null),
            fetch(`${API_BASE}/api/v1/categories/`, {
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal
            }).catch(() => null)
          ]);

          if (assetsRes && assetsRes.ok) {
            assetsData = await assetsRes.json();
          }
          if (categoriesRes && categoriesRes.ok) {
            categoriesData = await categoriesRes.json();
          }
        } catch (e) {
          console.warn('Initial load error:', e);
        }

        if ((!assetsData || !Array.isArray(assetsData) || assetsData.length === 0) && API_BASE !== PROD_BACKEND) {
          try {
            const fallbackRes = await fetch(`${PROD_BACKEND}/api/v1/assets/`);
            if (fallbackRes.ok) {
              assetsData = await fallbackRes.json();
            }
          } catch (e) {
            console.warn('Fallback assets fetch error:', e);
          }
        }

        if ((!categoriesData || !Array.isArray(categoriesData) || categoriesData.length === 0) && API_BASE !== PROD_BACKEND) {
          try {
            const fallbackCatRes = await fetch(`${PROD_BACKEND}/api/v1/categories/`);
            if (fallbackCatRes.ok) {
              categoriesData = await fallbackCatRes.json();
            }
          } catch (e) {
            console.warn('Fallback categories fetch error:', e);
          }
        }

        clearTimeout(timeoutId);

        if (isMounted) {
          if (Array.isArray(assetsData) && assetsData.length >= OLD_DATABASE_ASSETS.length) {
            setAssets(assetsData);
            const map = new Map();
            assetsData.forEach((a) => {
              if (a.location) map.set(a.location.id, a.location);
            });
            setLocations(Array.from(map.values()));
          } else {
            setAssets(OLD_DATABASE_ASSETS);
            setLocations(initialLocations);
          }

          if (categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0) {
            setCategories(categoriesData);
          } else {
            setCategories(OLD_DATABASE_CATEGORIES);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          setAssets(OLD_DATABASE_ASSETS);
          setLocations(initialLocations);
          setCategories(OLD_DATABASE_CATEGORIES);
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

  const targetAsset = useMemo(() => {
    if (!assetIdParam) return null;
    return assets.find((a) => String(a.id) === String(assetIdParam)) || null;
  }, [assets, assetIdParam]);

  const relatedAssets = useMemo(() => {
    return getRelatedAssets(targetAsset, assets);
  }, [assets, targetAsset]);

  const filteredAssets = useMemo(() => {
    let list = targetAsset ? relatedAssets : assets;

    if (!targetAsset && selectedCategoryId && selectedCategoryId !== 'all') {
      if (['camera', 'audio', 'power', 'lens', 'storage', 'lighting', 'tripod'].includes(selectedCategoryId)) {
        list = list.filter((a) => getAssetGroup(a) === selectedCategoryId);
      } else {
        const isParent = categories.some((cat) => cat.id === selectedCategoryId);
        if (isParent) {
          list = list.filter((a) => a.category && a.category.id === selectedCategoryId);
        } else {
          list = list.filter((a) => a.subcategory && a.subcategory.id === selectedCategoryId);
        }
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((a) => {
        const grp = getAssetGroup(a);
        if (q === 'camera' || q === 'cameras') return grp === 'camera';
        if (q === 'mic' || q === 'mics' || q === 'microphone' || q === 'microphones' || q === 'audio') return grp === 'audio';
        if (q === 'battery' || q === 'batteries' || q === 'charger' || q === 'power') return grp === 'power';
        if (q === 'card' || q === 'cards' || q === 'storage' || q === 'media') return grp === 'storage';
        if (q === 'lens' || q === 'lenses') return grp === 'lens';

        return (
          (a.name && a.name.toLowerCase().includes(q)) ||
          (a.serial_number && a.serial_number.toLowerCase().includes(q)) ||
          (a.location && a.location.name && a.location.name.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [assets, targetAsset, relatedAssets, selectedCategoryId, categories, searchQuery]);

  const getStatusClass = (status, available) => {
    if (status?.includes('Available') || available) return 'status-badge-available';
    if (status === 'Pending') return 'status-badge-pending';
    return 'status-badge-unavailable';
  };

  const currentAsset = useMemo(() => {
    return assets.find((a) => String(a.id) === String(selectedAssetId));
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

          {targetAsset ? (
            <div className="page-hero-banner mb-4" style={{ background: 'linear-gradient(135deg, #0a192f 0%, #1e3a8a 60%, #2563eb 100%)', borderRadius: '16px', padding: '24px 28px' }}>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                    <span className="badge px-3 py-1 rounded-pill" style={{ backgroundColor: '#2563eb', fontSize: '0.8rem' }}>
                      {getGroupDisplayName(getAssetGroup(targetAsset))}
                    </span>
                    <span className="text-white-50 small">
                      Showing equipment related to <strong className="text-white">{targetAsset.name}</strong>
                    </span>
                  </div>
                  <h1 className="page-hero-title mb-1" style={{ fontSize: '1.85rem' }}>
                    Related Equipment for "{targetAsset.name}"
                  </h1>
                  <p className="page-hero-subtitle mb-0 text-white-50">
                    Showing related assets in this category instead of all equipment. The selected asset is highlighted in blue below.
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <Link to="/assets" className="btn btn-outline-light btn-sm rounded-pill px-3 py-2 fw-semibold">
                    ← Back to All Assets
                  </Link>
                  <Button
                    variant="light"
                    size="sm"
                    className="rounded-pill px-3 py-2 fw-semibold"
                    onClick={() => {
                      navigate('/book-asset');
                      setSelectedCategoryId(null);
                      setSearchQuery('');
                    }}
                  >
                    View All Catalogue
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="page-hero-banner">
              <h1 className="page-hero-title">Book Equipment</h1>
              <p className="page-hero-subtitle">
                Choose professional gear from our studio inventory, select your rental dates, and reserve in seconds.
              </p>
            </div>
          )}

          <div className="catalog-filter-bar d-flex flex-wrap gap-3 align-items-center justify-content-between">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {targetAsset ? (
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="primary" className="px-3 py-2 rounded-pill fw-semibold" style={{ fontSize: '0.85rem' }}>
                    Showing {filteredAssets.length} Related {filteredAssets.length === 1 ? 'Item' : 'Items'}
                  </Badge>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill px-3 py-1"
                    onClick={() => {
                      navigate('/book-asset');
                      setSelectedCategoryId(null);
                      setSearchQuery('');
                    }}
                  >
                    Clear Filter
                  </Button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {EQUIPMENT_GROUPS.map((grp) => {
                    const isActive = (!selectedCategoryId && grp.id === 'all') || selectedCategoryId === grp.id;
                    return (
                      <Button
                        key={grp.id}
                        variant="light"
                        className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
                        onClick={() => setSelectedCategoryId(grp.id === 'all' ? null : grp.id)}
                      >
                        {grp.label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="search-input-wrapper">
              <input
                type="text"
                className="form-control search-input-field"
                placeholder={targetAsset ? "Search in related items..." : "Search equipment to book..."}
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


          <Row className="g-3 align-items-stretch">
            {filteredAssets.map((asset) => {
              const isTarget = targetAsset && String(asset.id) === String(targetAsset.id);

              return (
                <Col key={asset.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="h-100 asset-card rounded-3 shadow-sm border overflow-hidden"
                    style={isTarget ? { border: '2px solid #2563eb', boxShadow: '0 6px 18px rgba(37, 99, 235, 0.16)' } : { borderColor: '#e2e8f0' }}
                  >
                    <div className="asset-img-container position-relative" style={{ height: '145px', backgroundColor: '#f8fafc' }}>
                      {isTarget && (
                        <div className="position-absolute top-0 start-0 m-2" style={{ zIndex: 2 }}>
                          <span className="badge px-2 py-1 rounded-pill fw-bold" style={{ backgroundColor: '#2563eb', color: '#fff', fontSize: '0.7rem', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                            ★ Selected
                          </span>
                        </div>
                      )}
                      {targetAsset && !isTarget && (
                        <div className="position-absolute top-0 start-0 m-2" style={{ zIndex: 2 }}>
                          <span className="badge bg-light text-dark border px-2 py-1 rounded-pill small" style={{ fontSize: '0.68rem' }}>
                            Related
                          </span>
                        </div>
                      )}
                      {asset.image_url ? (
                        <Card.Img
                          variant="top"
                          src={asset.image_url}
                          className="asset-card-img"
                          alt={asset.name}
                          style={{ maxHeight: '120px', maxWidth: '85%', objectFit: 'contain' }}
                        />
                      ) : (
                        <div className="asset-card-placeholder p-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '32px', height: '32px' }}>
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          <span style={{ fontSize: '0.72rem' }}>No Photo</span>
                        </div>
                      )}
                    </div>

                    <Card.Body className="p-3 d-flex flex-column flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between mb-1" style={{ minHeight: '16px' }}>
                        <span className="text-uppercase fw-bold text-muted text-truncate" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>
                          {asset.category?.name || 'Equipment'}
                        </span>
                        {asset.total_quantity && (
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill small" style={{ fontSize: '0.68rem' }}>
                            ● {asset.total_quantity} In Stock
                          </span>
                        )}
                      </div>

                      <Card.Title
                        className="fw-bold mb-1 text-dark"
                        title={asset.name}
                        style={{
                          fontSize: '0.94rem',
                          lineHeight: '1.25rem',
                          minHeight: '2.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {asset.name}
                      </Card.Title>

                      <div className="text-muted small mb-2 text-truncate" style={{ fontSize: '0.75rem', minHeight: '16px' }}>
                        {asset.serial_number ? `S/N: ${asset.serial_number}` : ''}
                        {asset.serial_number && asset.location?.name ? ' • ' : ''}
                        {asset.location?.name || ''}
                      </div>

                      <div className="mt-auto pt-2">
                        <button
                          className="btn w-100 py-2 fw-semibold text-white rounded-pill d-flex align-items-center justify-content-center gap-1 shadow-sm border-0"
                          style={{
                            backgroundColor: isTarget ? '#1d4ed8' : '#2563eb',
                            fontSize: '0.84rem',
                            transition: 'all 0.2s ease',
                          }}
                          onClick={() => openBookingForm(asset.id)}
                        >
                          {isTarget ? 'Selected Item ✓' : 'Book Gear ➔'}
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
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
              ← {targetAsset ? 'Back to Related Equipment' : 'Back to Catalogue'}
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

          {relatedAssets.length > 1 && (
            <div className="mt-4 pt-3 border-top">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0 text-dark">
                  Other Related Equipment in this Category
                </h6>
                <span className="text-muted small">
                  Showing related gear
                </span>
              </div>
              <Row className="g-3">
                {relatedAssets
                  .filter(a => String(a.id) !== String(selectedAssetId))
                  .slice(0, 3)
                  .map(rel => (
                    <Col key={rel.id} xs={12} sm={4}>
                      <div className="p-3 border rounded-3 bg-white h-100 d-flex flex-column justify-content-between shadow-sm">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          {rel.image_url ? (
                            <img src={rel.image_url} alt={rel.name} style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px' }} />
                          ) : (
                            <div style={{ width: '42px', height: '42px', backgroundColor: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
                          )}
                          <div className="min-w-0">
                            <div className="fw-semibold text-truncate small">{rel.name}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{rel.location?.name || 'Available'}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100 rounded-pill py-1 fw-semibold"
                          style={{ fontSize: '0.78rem' }}
                          onClick={() => openBookingForm(rel.id)}
                        >
                          Book this instead ⚡
                        </Button>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          )}
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
