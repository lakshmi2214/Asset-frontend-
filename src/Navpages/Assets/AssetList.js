import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { API_BASE, PROD_BACKEND } from '../../auth';
import { getAssetGroup } from '../../assetGroups';
import { OLD_DATABASE_ASSETS, OLD_DATABASE_CATEGORIES } from '../../oldDatabaseAssets';

const ASSET_CATEGORIES = [
  { id: 'all', name: 'All Equipment' },
  { id: 'camera', name: '📷 Cameras' },
  { id: 'lens', name: '🔍 Lenses' },
  { id: 'audio', name: '🎙️ Mics & Audio' },
  { id: 'lighting', name: '💡 Lighting' },
  { id: 'power', name: '🔋 Batteries & Power' },
  { id: 'storage', name: '💾 Storage & Media' },
  { id: 'tripod', name: '📐 Stands & Supports' },
];

export default function AssetList() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Pre-seed with the complete 19 assets from the old database
  const [assets, setAssets] = useState(OLD_DATABASE_ASSETS);
  const [categories, setCategories] = useState(OLD_DATABASE_CATEGORIES);
  const [loading, setLoading] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        let assetsData = null;
        let categoriesData = null;

        try {
          const [assetsRes, categoriesRes] = await Promise.all([
            fetch(`${PROD_BACKEND}/api/v1/assets/`, {
              headers: { 'Content-Type': 'application/json' },
              signal: controller.signal
            }).catch(() => null),
            fetch(`${PROD_BACKEND}/api/v1/categories/`, {
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
          console.warn("API fetch error:", e);
        }

        clearTimeout(timeoutId);

        if (isMounted) {
          // Only update if we received the full catalog (at least as many as OLD_DATABASE_ASSETS)
          // to prevent any local backend with only 4 test items from overwriting the real catalog
          if (Array.isArray(assetsData) && assetsData.length >= OLD_DATABASE_ASSETS.length) {
            setAssets(assetsData);
          } else {
            setAssets(OLD_DATABASE_ASSETS);
          }

          if (Array.isArray(categoriesData) && categoriesData.length > 0) {
            setCategories(categoriesData);
          } else {
            setCategories(OLD_DATABASE_CATEGORIES);
          }
        }
      } catch (err) {
        console.error("AssetList load error:", err);
        if (isMounted) {
          setAssets(OLD_DATABASE_ASSETS);
          setCategories(OLD_DATABASE_CATEGORIES);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const qParam = searchParams.get('q');

    if (categoryParam) {
      const paramLower = categoryParam.toLowerCase();
      if (paramLower.includes('camera')) setSelectedCategoryId('camera');
      else if (paramLower.includes('mic') || paramLower.includes('audio')) setSelectedCategoryId('audio');
      else if (paramLower.includes('battery') || paramLower.includes('power')) setSelectedCategoryId('power');
      else if (paramLower.includes('lens')) setSelectedCategoryId('lens');
      else if (paramLower.includes('card') || paramLower.includes('storage') || paramLower.includes('media')) setSelectedCategoryId('storage');
      else if (paramLower.includes('light')) setSelectedCategoryId('lighting');
      else if (paramLower.includes('tripod') || paramLower.includes('stand')) setSelectedCategoryId('tripod');
      else if (categories.length > 0) {
        const match = categories.find(c =>
          c.name.toLowerCase().includes(paramLower) ||
          String(c.id) === categoryParam
        );
        if (match) {
          setSelectedCategoryId(match.id);
        }
      }
    }

    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams, categories]);

  const activeCategory = useMemo(() => {
    if (selectedCategoryId === 'all') return null;
    return categories.find(c => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const filteredAssets = useMemo(() => {
    let list = assets;

    if (selectedCategoryId !== 'all') {
      if (['camera', 'audio', 'power', 'lens', 'storage', 'lighting', 'tripod', 'backdrop'].includes(selectedCategoryId)) {
        list = list.filter(a => getAssetGroup(a) === selectedCategoryId);
      } else {
        list = list.filter(a => {
          if (!a.category) return false;
          return a.category.id === selectedCategoryId || String(a.category.id) === String(selectedCategoryId);
        });
      }
    }

    if (selectedSubcategoryId !== 'all') {
      list = list.filter(a => {
        if (!a.subcategory) return false;
        return a.subcategory.id === selectedSubcategoryId || String(a.subcategory.id) === String(selectedSubcategoryId);
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a => {
        const grp = getAssetGroup(a);
        if (q === 'camera' || q === 'cameras') return grp === 'camera';
        if (q === 'mic' || q === 'mics' || q === 'microphone' || q === 'microphones' || q === 'audio') return grp === 'audio';
        if (q === 'battery' || q === 'batteries' || q === 'charger' || q === 'power') return grp === 'power';
        if (q === 'card' || q === 'cards' || q === 'storage' || q === 'media') return grp === 'storage';
        if (q === 'lens' || q === 'lenses') return grp === 'lens';
        if (q === 'light' || q === 'lights' || q === 'lighting') return grp === 'lighting';
        if (q === 'tripod' || q === 'tripods' || q === 'stand' || q === 'stands') return grp === 'tripod';

        return (
          (a.name && a.name.toLowerCase().includes(q)) ||
          (a.serial_number && a.serial_number.toLowerCase().includes(q)) ||
          (a.description && a.description.toLowerCase().includes(q)) ||
          (a.location && a.location.name && a.location.name.toLowerCase().includes(q)) ||
          (a.category && a.category.name && a.category.name.toLowerCase().includes(q)) ||
          (a.subcategory && a.subcategory.name && a.subcategory.name.toLowerCase().includes(q))
        );
      });
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

        {/* Page Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h1 className="fw-bolder mb-1" style={{ fontSize: '1.9rem', color: '#1e3a8a', letterSpacing: '-0.5px' }}>
              Equipment Catalog
            </h1>
            <p className="mb-0" style={{ fontSize: '0.95rem', color: '#1e40af', opacity: 0.85 }}>
              Explore and reserve high-grade camera gear, lighting, and accessories.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span
              className="badge px-3 py-2 rounded-pill fw-semibold"
              style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontSize: '0.85rem' }}
            >
              {loading ? 'Loading...' : `${filteredAssets.length} Equipment${filteredAssets.length === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-4 p-3 mb-4 shadow-sm border" style={{ borderColor: '#dbeafe' }}>
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">

            <div
              className="position-relative d-flex align-items-center flex-shrink-0"
              style={{ width: '100%', maxWidth: '270px' }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
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
                className="form-control rounded-pill ps-5 pe-4 py-2 border"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: '#f0f7ff', borderColor: '#bfdbfe', fontSize: '0.88rem', color: '#1e3a8a' }}
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

            {/* Category Filter Pills */}
            <div
              className="d-flex align-items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar py-1"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {ASSET_CATEGORIES.map((cat) => {
                const isActive = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className="btn rounded-pill px-3 py-1 fw-semibold border text-nowrap flex-shrink-0"
                    style={{
                      fontSize: '0.85rem',
                      backgroundColor: isActive ? '#2563eb' : '#ffffff',
                      color: isActive ? '#ffffff' : '#1e40af',
                      borderColor: isActive ? '#2563eb' : '#dbeafe',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Smart Presets Quick Bar */}
          <div className="d-flex align-items-center gap-2 flex-wrap pt-2 mt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
            <span className="badge rounded-pill text-white fw-bold px-2 py-1" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', fontSize: '0.72rem' }}>
              ✦ AI Presets
            </span>
            <button
              type="button"
              onClick={() => { setSelectedCategoryId('camera'); setSearchQuery('Sony'); }}
              className="btn btn-sm btn-light rounded-pill px-2 py-0 text-secondary border"
              style={{ fontSize: '0.76rem' }}
            >
              🎥 4K Cine Bodies
            </button>
            <button
              type="button"
              onClick={() => { setSelectedCategoryId('audio'); setSearchQuery('Mic'); }}
              className="btn btn-sm btn-light rounded-pill px-2 py-0 text-secondary border"
              style={{ fontSize: '0.76rem' }}
            >
              🎙️ Wireless Audio
            </button>
            <button
              type="button"
              onClick={() => { setSelectedCategoryId('lighting'); setSearchQuery('Godox'); }}
              className="btn btn-sm btn-light rounded-pill px-2 py-0 text-secondary border"
              style={{ fontSize: '0.76rem' }}
            >
              💡 Continuous Lights
            </button>
            <button
              type="button"
              onClick={() => { setSelectedCategoryId('power'); setSearchQuery('Battery'); }}
              className="btn btn-sm btn-light rounded-pill px-2 py-0 text-secondary border"
              style={{ fontSize: '0.76rem' }}
            >
              🔋 Power &amp; Chargers
            </button>
            <button
              type="button"
              onClick={() => { setSelectedCategoryId('storage'); setSearchQuery('CFexpress'); }}
              className="btn btn-sm btn-light rounded-pill px-2 py-0 text-secondary border"
              style={{ fontSize: '0.76rem' }}
            >
              💾 High-Speed Media
            </button>
          </div>

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
            {selectedCategoryId !== 'all' && (
              <Badge
                bg="dark"
                className="rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-1"
                style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={() => handleCategorySelect('all')}
              >
                {ASSET_CATEGORIES.find(c => c.id === selectedCategoryId)?.name || activeCategory?.name || selectedCategoryId} <span>✕</span>
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

        {/* Skeleton Loading State (4 columns compact) */}
        {loading && (
          <Row className="g-3 align-items-stretch">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                <div className="bg-white rounded-3 border p-3 shadow-sm h-100 d-flex flex-column" style={{ borderColor: '#f1f5f9' }}>
                  <div className="rounded-3 mb-2" style={{ height: '145px', backgroundColor: '#f1f5f9' }}></div>
                  <div className="rounded mb-2" style={{ height: '12px', width: '40%', backgroundColor: '#f1f5f9' }}></div>
                  <div className="rounded mb-2" style={{ height: '16px', width: '85%', backgroundColor: '#f1f5f9' }}></div>
                  <div className="rounded mb-3" style={{ height: '12px', width: '55%', backgroundColor: '#f8fafc' }}></div>
                  <div className="rounded-pill mt-auto" style={{ height: '32px', width: '100%', backgroundColor: '#f1f5f9' }}></div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Compact, Perfectly Aligned Asset Cards Grid (4 columns) */}
        {!loading && filteredAssets.length > 0 && (
          <Row className="g-3 align-items-stretch">
            {filteredAssets.map((asset) => {
              const isAvailable = Boolean(asset.available || asset.status?.toLowerCase().includes('available'));
              const unitsCount = asset.available_quantity || asset.total_quantity || asset.quantity || 1;

              return (
                <Col key={asset.id} xs={12} sm={6} md={4} lg={3}>
                  <div
                    className="card h-100 border rounded-3 overflow-hidden shadow-sm equipment-card-hover"
                    style={{
                      borderColor: '#e2e8f0',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Compact Image Container: 145px height */}
                    <div
                      className="d-flex align-items-center justify-content-center p-2 position-relative"
                      style={{
                        height: '145px',
                        backgroundColor: '#f8fafc',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      {asset.image_url ? (
                        <img
                          src={asset.image_url}
                          alt={asset.name}
                          style={{
                            maxHeight: '120px',
                            maxWidth: '85%',
                            objectFit: 'contain',
                            transition: 'transform 0.25s ease',
                          }}
                          className="equipment-img-hover"
                        />
                      ) : (
                        <div className="text-center text-muted d-flex flex-column align-items-center justify-content-center">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          <span className="small mt-1 text-muted" style={{ fontSize: '0.72rem' }}>No Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Compact Card Body with Uniform Alignment */}
                    <div className="card-body p-3 d-flex flex-column flex-grow-1">
                      {/* Department / Category Tag & Stock Status Header */}
                      <div className="d-flex align-items-center justify-content-between gap-1 mb-1" style={{ minHeight: '18px' }}>
                        <span
                          className="text-uppercase fw-bold text-muted text-truncate"
                          style={{ fontSize: '0.68rem', letterSpacing: '0.5px', maxWidth: '58%' }}
                        >
                          {asset.category?.name || asset.subcategory?.name || 'Equipment'}
                        </span>
                        <span
                          className="badge fw-semibold text-nowrap"
                          style={{
                            backgroundColor: isAvailable ? '#ecfdf5' : '#fef2f2',
                            color: isAvailable ? '#059669' : '#dc2626',
                            fontSize: '0.7rem',
                            borderRadius: '9999px',
                            padding: '2px 8px',
                          }}
                        >
                          ● {isAvailable ? `${unitsCount} in stock` : 'Unavailable'}
                        </span>
                      </div>

                      {/* Clamped 2-Line Title: Consistent Height across every card in row */}
                      <h6
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
                      </h6>

                      {/* Serial Number & Location */}
                      <div className="text-muted small mb-3 text-truncate" style={{ fontSize: '0.75rem', minHeight: '16px' }}>
                        {asset.serial_number ? `S/N: ${asset.serial_number}` : ''}
                        {asset.serial_number && asset.location?.name ? ' • ' : ''}
                        {asset.location?.name || ''}
                      </div>

                      {/* Pinned Bottom Book Button */}
                      <div className="mt-auto pt-1">
                        <Link
                          to={`/book-asset?assetId=${asset.id}`}
                          className="btn w-100 py-2 fw-semibold text-white d-flex align-items-center justify-content-center gap-1 text-decoration-none shadow-sm"
                          style={{
                            backgroundColor: '#2563eb',
                            borderRadius: '10px',
                            fontSize: '0.84rem',
                            border: 'none',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
                        >
                          <span>Book Equipment</span>
                          <span>➔</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}

        {/* Empty State */}
        {!loading && filteredAssets.length === 0 && (
          <div className="text-center py-5 my-5 bg-white rounded-4 border p-5 shadow-sm" style={{ borderColor: '#dbeafe' }}>
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: '64px', height: '64px', backgroundColor: '#f0f7ff', border: '1px solid #bfdbfe' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h4 className="fw-bold mb-2" style={{ color: '#1e3a8a' }}>No Equipment Found</h4>
            <p className="mb-4 mx-auto" style={{ maxWidth: '420px', fontSize: '0.92rem', color: '#1e40af', opacity: 0.85 }}>
              We couldn't find any gear matching your current search or category filter. Try clearing filters or searching for something else.
            </p>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 py-2 fw-semibold border-0"
              style={{ backgroundColor: '#2563eb', fontSize: '0.88rem' }}
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
