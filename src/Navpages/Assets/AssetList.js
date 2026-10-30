import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { API_BASE } from '../../auth';

export default function AssetList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch assets and categories on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

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
            setAssets(Array.isArray(assetsData) ? assetsData : []);
          } else {
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
        console.error("AssetList fetch error:", err);
        if (isMounted) {
          setAssets([]);
          setCategories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  // Sync with URL query parameters (?category=... or ?q=...)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const qParam = searchParams.get('q');

    if (categoryParam && categories.length > 0) {
      const paramLower = categoryParam.toLowerCase();
      const match = categories.find(c =>
        c.name.toLowerCase().includes(paramLower) ||
        String(c.id) === categoryParam
      );
      if (match) {
        setSelectedCategoryId(match.id);
      }
    }

    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams, categories]);

  // Current active category object
  const activeCategory = useMemo(() => {
    if (selectedCategoryId === 'all') return null;
    return categories.find(c => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  // Filtered assets calculation
  const filteredAssets = useMemo(() => {
    let list = assets;

    // Filter by category
    if (selectedCategoryId !== 'all') {
      list = list.filter(a => {
        if (!a.category) return false;
        return a.category.id === selectedCategoryId || String(a.category.id) === String(selectedCategoryId);
      });
    }

    // Filter by subcategory
    if (selectedSubcategoryId !== 'all') {
      list = list.filter(a => {
        if (!a.subcategory) return false;
        return a.subcategory.id === selectedSubcategoryId || String(a.subcategory.id) === String(selectedSubcategoryId);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.serial_number && a.serial_number.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.location && a.location.name && a.location.name.toLowerCase().includes(q)) ||
        (a.category && a.category.name && a.category.name.toLowerCase().includes(q)) ||
        (a.subcategory && a.subcategory.name && a.subcategory.name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [assets, selectedCategoryId, selectedSubcategoryId, searchQuery]);

  const resetAllFilters = () => {
    setSelectedCategoryId('all');
    setSelectedSubcategoryId('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId('all');
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <Container>
        {/* Clean Page Title Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h1 className="fw-bolder mb-1" style={{ fontSize: '1.9rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Equipment Catalog
            </h1>
            <p className="text-secondary mb-0" style={{ fontSize: '0.95rem' }}>
              Explore and reserve high-grade camera gear, lighting, and accessories.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span
              className="badge px-3 py-2 rounded-pill fw-semibold"
              style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.85rem' }}
            >
              {loading ? 'Loading...' : `${filteredAssets.length} Equipment${filteredAssets.length === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-4 p-3 mb-4 shadow-sm border" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
            {/* Search Input */}
            <div
              className="position-relative d-flex align-items-center flex-shrink-0"
              style={{ width: '100%', maxWidth: '270px' }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="position-absolute ms-3"
                style={{ pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="form-control rounded-pill ps-5 pe-4 py-2 border-0"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: '#f8fafc', fontSize: '0.88rem', color: '#0f172a' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn btn-link position-absolute end-0 me-2 p-1 text-muted text-decoration-none"
                  style={{ fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills (Clean Single Row, Never Breaks Awkwardly) */}
            <div
              className="d-flex align-items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar py-1"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="btn rounded-pill px-3 py-1 fw-semibold border-0 text-nowrap flex-shrink-0"
                style={{
                  fontSize: '0.85rem',
                  backgroundColor: selectedCategoryId === 'all' ? '#0f172a' : '#f8fafc',
                  color: selectedCategoryId === 'all' ? '#ffffff' : '#475569',
                  transition: 'all 0.2s ease',
                }}
              >
                All Gear
              </button>

              {categories.map((cat) => {
                const isActive = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className="btn rounded-pill px-3 py-1 fw-semibold border-0 text-nowrap flex-shrink-0"
                    style={{
                      fontSize: '0.85rem',
                      backgroundColor: isActive ? '#0f172a' : '#f8fafc',
                      color: isActive ? '#ffffff' : '#475569',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Row (if selected category has subcategories) */}
          {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
            <div
              className="d-flex align-items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar pt-3 mt-3 border-top"
              style={{ borderColor: '#f1f5f9', WebkitOverflowScrolling: 'touch' }}
            >
              <span className="text-secondary small fw-semibold me-1 text-nowrap flex-shrink-0">Subcategories:</span>
              <button
                type="button"
                onClick={() => setSelectedSubcategoryId('all')}
                className="btn btn-sm rounded-pill px-3 py-0 border text-nowrap flex-shrink-0"
                style={{
                  fontSize: '0.8rem',
                  backgroundColor: selectedSubcategoryId === 'all' ? '#334155' : 'transparent',
                  color: selectedSubcategoryId === 'all' ? '#ffffff' : '#64748b',
                  borderColor: selectedSubcategoryId === 'all' ? '#334155' : '#e2e8f0',
                }}
              >
                All {activeCategory.name}
              </button>
              {activeCategory.subcategories.map((sub) => {
                const isSubActive = selectedSubcategoryId === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubcategoryId(sub.id)}
                    className="btn btn-sm rounded-pill px-3 py-0 border text-nowrap flex-shrink-0"
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: isSubActive ? '#334155' : 'transparent',
                      color: isSubActive ? '#ffffff' : '#64748b',
                      borderColor: isSubActive ? '#334155' : '#e2e8f0',
                    }}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Filter Badges */}
        {(selectedCategoryId !== 'all' || searchQuery.trim() || selectedSubcategoryId !== 'all') && (
          <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
            <span className="text-muted small">Active filters:</span>
            {activeCategory && (
              <Badge
                bg="dark"
                className="rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-1"
                style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={() => handleCategorySelect('all')}
              >
                {activeCategory.name} <span>✕</span>
              </Badge>
            )}
            {selectedSubcategoryId !== 'all' && (
              <Badge
                bg="secondary"
                className="rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-1"
                style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={() => setSelectedSubcategoryId('all')}
              >
                Subcategory <span>✕</span>
              </Badge>
            )}
            {searchQuery.trim() && (
              <Badge
                bg="light"
                text="dark"
                className="rounded-pill px-3 py-2 fw-medium border d-inline-flex align-items-center gap-1"
                style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={() => setSearchQuery('')}
              >
                "{searchQuery}" <span>✕</span>
              </Badge>
            )}
            <button
              type="button"
              onClick={resetAllFilters}
              className="btn btn-link btn-sm text-secondary text-decoration-none p-0 ms-auto"
              style={{ fontSize: '0.85rem' }}
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <Row className="g-4">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <Col key={idx} xs={12} sm={6} lg={4}>
                <div className="bg-white rounded-4 border p-3 shadow-sm h-100" style={{ borderColor: '#f1f5f9' }}>
                  <div className="rounded-3 mb-3" style={{ height: '200px', backgroundColor: '#f1f5f9' }}></div>
                  <div className="rounded mb-2" style={{ height: '20px', width: '70%', backgroundColor: '#f1f5f9' }}></div>
                  <div className="rounded mb-3" style={{ height: '14px', width: '40%', backgroundColor: '#f8fafc' }}></div>
                  <div className="rounded-pill" style={{ height: '36px', width: '100%', backgroundColor: '#f1f5f9' }}></div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Equipment Cards Grid */}
        {!loading && filteredAssets.length > 0 && (
          <Row className="g-4">
            {filteredAssets.map((asset) => {
              const isAvailable = Boolean(asset.available || asset.status?.toLowerCase().includes('available'));
              const unitsCount = asset.available_quantity || asset.total_quantity || asset.quantity || 1;
              const totalCount = asset.total_quantity || asset.quantity || 1;

              return (
                <Col key={asset.id} xs={12} sm={6} lg={4}>
                  <div
                    className="card h-100 border rounded-4 overflow-hidden shadow-sm equipment-card-hover"
                    style={{
                      borderColor: '#e2e8f0',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {/* Image Area - Clean gear view without overlapping badges */}
                    <div
                      className="d-flex align-items-center justify-content-center p-3"
                      style={{ height: '220px', backgroundColor: '#f8fafc' }}
                    >
                      {/* Equipment Photo */}
                      {asset.image_url ? (
                        <img
                          src={asset.image_url}
                          alt={asset.name}
                          style={{
                            maxHeight: '180px',
                            maxWidth: '85%',
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease',
                          }}
                          className="equipment-img-hover"
                        />
                      ) : (
                        <div className="text-center text-muted">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          <div className="small mt-1" style={{ fontSize: '0.78rem' }}>No Image Available</div>
                        </div>
                      )}
                    </div>

                    {/* Card Details */}
                    <div className="card-body p-4 d-flex flex-column">
                      <h5
                        className="fw-bold mb-1 text-truncate"
                        title={asset.name}
                        style={{ fontSize: '1.15rem', color: '#0f172a' }}
                      >
                        {asset.name}
                      </h5>

                      <div className="text-muted small mb-3" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        S/N: {asset.serial_number || '01'}
                      </div>

                      {/* Availability Badge under image (in place of location & total units) */}
                      <div className="d-flex align-items-center gap-2 flex-wrap mb-4 mt-auto">
                        <span
                          className="badge fw-semibold px-3 py-2 d-inline-flex align-items-center gap-1"
                          style={{
                            backgroundColor: isAvailable ? '#10b981' : '#ef4444',
                            color: '#ffffff',
                            fontSize: '0.78rem',
                            borderRadius: '9999px',
                            letterSpacing: '0.2px',
                          }}
                        >
                          • {isAvailable ? `${unitsCount} Unit${unitsCount > 1 ? 's' : ''} Available` : 'Unavailable'}
                        </span>
                      </div>

                      {/* Card Action - Full-width Blue Button: View Details → */}
                      <Link
                        to={`/assets/${asset.id}`}
                        className="btn w-100 py-2 fw-semibold text-white d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                        style={{
                          backgroundColor: '#2563eb',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(37, 99, 235, 0.18)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}

        {/* Empty State */}
        {!loading && filteredAssets.length === 0 && (
          <div className="text-center py-5 my-5 bg-white rounded-4 border p-5 shadow-sm" style={{ borderColor: '#e2e8f0' }}>
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: '64px', height: '64px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h4 className="fw-bold mb-2" style={{ color: '#0f172a' }}>No Equipment Found</h4>
            <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '420px', fontSize: '0.92rem' }}>
              We couldn't find any gear matching your current search or category filter. Try clearing filters or searching for something else.
            </p>
            <button
              type="button"
              className="btn btn-dark rounded-pill px-4 py-2 fw-semibold border-0"
              style={{ backgroundColor: '#0f172a', fontSize: '0.88rem' }}
              onClick={resetAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
