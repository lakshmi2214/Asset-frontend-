import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE, isStandaloneMode } from '../../auth';
import { MOCK_ASSETS, MOCK_CATEGORIES } from '../../Home/mockData';

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);

  // null  = show all assets
  // {type:'category', id} = main category selected
  // {type:'subcategory', id, parentId} = subcategory selected
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isStandaloneMode()) {
        if (isMounted) {
          setAssets(MOCK_ASSETS);
          setCategories(MOCK_CATEGORIES);
        }
        return;
      }

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
            } else {
              setAssets(MOCK_ASSETS);
            }
          } else {
            setAssets(MOCK_ASSETS);
          }
          if (categoriesRes && categoriesRes.ok) {
            const categoriesData = await categoriesRes.json();
            if (categoriesData && categoriesData.length > 0) {
              setCategories(categoriesData);
            } else {
              setCategories(MOCK_CATEGORIES);
            }
          } else {
            setCategories(MOCK_CATEGORIES);
          }
        }
      } catch (err) {
        console.error("AssetList fetch error, falling back to mock data:", err);
        if (isMounted) {
          setAssets(MOCK_ASSETS);
          setCategories(MOCK_CATEGORIES);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const filteredAssets = useMemo(() => {
    let list = assets;

    if (filter) {
      if (filter.type === 'category') {
        list = list.filter(a => {
          const catMatch = a.category && (
            a.category.id === filter.id ||
            String(a.category.id) === String(filter.id)
          );
          const nameMatch = a.category && (
            a.category.name === (categories.find(c => c.id === filter.id) || {}).name
          );
          return catMatch || nameMatch;
        });
      } else if (filter.type === 'subcategory') {
        list = list.filter(a => {
          const subMatch = a.subcategory && (
            a.subcategory.id === filter.id ||
            String(a.subcategory.id) === String(filter.id)
          );
          const nameMatch = a.subcategory && (() => {
            const parentCat = categories.find(c => c.id === filter.parentId);
            const sub = parentCat && parentCat.subcategories &&
              parentCat.subcategories.find(s => s.id === filter.id);
            return sub && a.subcategory.name === sub.name;
          })();
          return subMatch || nameMatch;
        });
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
  }, [assets, categories, filter, searchQuery]);

  const isCategoryActive = (catId) =>
    filter && filter.type === 'category' && filter.id === catId;

  const isSubcategoryActive = (subId) =>
    filter && filter.type === 'subcategory' && filter.id === subId;

  const isDropdownActive = (cat) =>
    isCategoryActive(cat.id) ||
    (cat.subcategories && cat.subcategories.some(s => isSubcategoryActive(s.id)));

  const activeLabel = useMemo(() => {
    if (!filter) return null;
    if (filter.type === 'category') {
      const cat = categories.find(c => c.id === filter.id);
      return cat ? `All ${cat.name}` : 'Category';
    }
    if (filter.type === 'subcategory') {
      const parent = categories.find(c => c.id === filter.parentId);
      const sub = parent && parent.subcategories &&
        parent.subcategories.find(s => s.id === filter.id);
      return sub ? `${parent.name} › ${sub.name}` : 'Subcategory';
    }
    return null;
  }, [filter, categories]);

  const getStatusClass = (status, available) => {
    if (status?.includes('Available') || available) return 'status-badge-available';
    if (status === 'Pending') return 'status-badge-pending';
    return 'status-badge-unavailable';
  };

  return (
    <Container className="py-4">
      <div className="page-hero-banner">
        <div className="page-hero-badge">
          ✦ GEAR & EQUIPMENT CATALOG
        </div>
        <h1 className="page-hero-title">Equipment Inventory</h1>
        <p className="page-hero-subtitle">
          Explore production-grade cameras, lighting, audio gear, and accessories available across company studios.
        </p>
      </div>

      <div className="catalog-filter-bar d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <Button
            variant="light"
            className={`filter-btn ${!filter ? 'filter-btn-active' : ''}`}
            onClick={() => setFilter(null)}
          >
            All Assets
          </Button>

          <div className="vr mx-1 opacity-25 d-none d-sm-block" />

          {categories.map(cat => {
            const active = isDropdownActive(cat);
            return (
              <DropdownButton
                key={cat.id}
                variant="light"
                title={cat.name}
                className={`filter-dropdown ${active ? 'filter-dropdown-active' : ''}`}
                size="sm"
                renderMenuOnMount={true}
                toggleClassName={`filter-btn ${active ? 'filter-btn-active' : ''}`}
                id={`dropdown-cat-${cat.id}`}
              >
                <Dropdown.Item
                  active={isCategoryActive(cat.id)}
                  onClick={() => setFilter({ type: 'category', id: cat.id })}
                >
                  All {cat.name}
                </Dropdown.Item>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <>
                    <Dropdown.Divider />
                    {cat.subcategories.map(sub => (
                      <Dropdown.Item
                        key={sub.id}
                        active={isSubcategoryActive(sub.id)}
                        onClick={() =>
                          setFilter({ type: 'subcategory', id: sub.id, parentId: cat.id })
                        }
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
            placeholder="Search by gear name, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {(activeLabel || searchQuery) && (
        <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
          <span className="text-muted small">Filtered results:</span>
          {activeLabel && (
            <Badge
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                fontSize: '0.82rem',
                padding: '0.45em 0.9em',
                borderRadius: '999px',
                cursor: 'pointer'
              }}
              onClick={() => setFilter(null)}
              title="Click to remove category filter"
            >
              {activeLabel} <span className="ms-1 opacity-75">✕</span>
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
        {filteredAssets.map(a => (
          <Col key={a.id} xs={12} sm={6} lg={4}>
            <Card className="h-100 asset-card">
              <div className="asset-img-container">
                {a.category && (
                  <span className="asset-floating-cat">
                    {a.category.name}
                  </span>
                )}

                <span className={`asset-floating-status ${getStatusClass(a.status, a.available)}`}>
                  ● {a.status || (a.available ? 'Available' : 'Out of Stock')}
                </span>

                {a.image_url ? (
                  <Card.Img
                    variant="top"
                    src={a.image_url}
                    className="asset-card-img"
                    alt={a.name}
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
                <Card.Title className="asset-card-title" title={a.name}>
                  {a.name}
                </Card.Title>

                {a.serial_number && (
                  <div className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
                    S/N: {a.serial_number}
                  </div>
                )}

                <div className="d-flex align-items-center gap-2 flex-wrap mt-auto pt-2">
                  {a.location && (
                    <span className="asset-tag-pill location">
                      📍 {a.location.name}
                    </span>
                  )}
                  {a.subcategory && (
                    <span className="asset-tag-pill">
                      {a.subcategory.name}
                    </span>
                  )}
                  {a.total_quantity && (
                    <span className="asset-tag-pill stock">
                      ⚡ {a.total_quantity} Total Units
                    </span>
                  )}
                </div>
              </Card.Body>

              <Card.Footer className="asset-card-footer">
                <Link to={`/assets/${a.id}`} className="text-decoration-none">
                  <button className="btn-card-action btn-card-action-primary">
                    View Details →
                  </button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredAssets.length === 0 && (
        <div className="text-center py-5 my-4 bg-white rounded-4 border p-5 shadow-sm">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎥</div>
          <h4 className="fw-bold mb-2">No Equipment Found</h4>
          <p className="text-muted mb-4">
            No gear matches your current filter or search criteria.
          </p>
          <Button
            variant="outline-primary"
            className="rounded-pill px-4"
            onClick={() => { setFilter(null); setSearchQuery(''); }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </Container>
  );
}
