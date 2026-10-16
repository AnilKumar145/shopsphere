/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-13A & CR-04B — Memoized Analytics & Dual View Catalog
 * Module 13 (Units 13.1, 13.3, 13.7) & Module 4 (Units 4.2, 4.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Optimize catalog filtering using useMemo for price bounds and
 *    category distributions, paired with viewMode list/grid toggle.
 * 📁 Reference: shopsphere-solution/src/pages/ProductListPage.tsx
 * ============================================================================
 */

/**
 * Product Catalog & Listing Route
 * Demonstrates 6.4 Controlled Components, 7.5 useMemo, 8.6 Query Parameters, 9.9 TanStack Query, 13.4 List Optimization
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { useProducts, useCategories } from '../hooks/useCatalog';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { ProductListRow } from '../features/catalog/components/ProductListRow';
import { ProductGridSkeleton } from '../features/catalog/components/ProductSkeleton';
import { ProductViewToggle, CatalogViewMode } from '../components/catalog/ProductViewToggle';
import { QuickViewModal } from '../components/catalog/QuickViewModal';
import { Product, SortOption } from '../types';
import { formatCategoryName } from '../utils/formatters';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAppSelector } from '../store';
import { Button } from '../components/ui/Button';
import './ProductListPage.css';

export const ProductListPage: React.FC = () => {
  useDocumentTitle('Catalog & Collections');

  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';
  const urlSort = (searchParams.get('sort') as SortOption) || SortOption.FEATURED;

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchInput, setSearchInput] = useState<string>(urlSearch);
  const [sortOption, setSortOption] = useState<SortOption>(urlSort);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<CatalogViewMode>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(searchInput, 250);
  const itemsPerPage = useAppSelector((state) => state.preferences.itemsPerPage);

  const { data: products, isLoading, isError, refetch } = useProducts();
  const { data: categories } = useCategories();

  // Sync state with URL params on back/forward navigation
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearchInput(urlSearch);
    setSortOption(urlSort);
  }, [urlCategory, urlSearch, urlSort]);

  // Update URL params when user changes filters
  const updateUrlParams = (cat: string, search: string, sort: SortOption) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'all') params.set('category', cat);
    if (search.trim()) params.set('search', search.trim());
    if (sort !== SortOption.FEATURED) params.set('sort', sort);
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    updateUrlParams(cat, debouncedSearch, sortOption);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    updateUrlParams(selectedCategory, debouncedSearch, newSort);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  // Sync debounced search to URL
  useEffect(() => {
    updateUrlParams(selectedCategory, debouncedSearch, sortOption);
  }, [debouncedSearch]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchInput('');
    setSortOption(SortOption.FEATURED);
    setMinRating(0);
    setMaxPrice(1000);
    setCurrentPage(1);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // ============================================================================
  // 🚀 CHANGE REQUEST: CR-13A
  // Memoized Catalog Computations with useMemo for Price & Category Analytics
  // Module 13: Performance Optimization | CTO Focus: Performance Optimization
  // ----------------------------------------------------------------------------
  // 🎯 OBJECTIVE: Optimize product filtering and sorting with useMemo so expensive
  //    array transformations do not re-execute on unrelated component renders.
  // 📖 REFERENCE SPEC: change-requests/CR-13A/request.md
  // 🌟 GOLDEN SOLUTION: shopsphere-solution/src/pages/ProductListPage.tsx
  // ============================================================================
  const filteredProducts = useMemo(() => {
    // 📝 STEP 1: Guard clause for empty or loading product catalog
    // Return empty array [] if products is undefined or empty.
    if (!products) return [];

    // 📝 STEP 2: Filter by category
    // If selectedCategory is provided and !== 'all', filter products matching category (case-insensitive).

    // 📝 STEP 3: Multi-field search query filtering
    // If debouncedSearch is non-empty, filter products matching title, description, or category.

    // 📝 STEP 4: Filter by price and rating boundaries
    // If maxPrice < 1000, filter products with price <= maxPrice.
    // If minRating > 0, filter products with rating.rate >= minRating.

    // 📝 STEP 5: Sort according to SortOption enum
    // Sort according to:
    // - SortOption.PRICE_ASC: ascending price
    // - SortOption.PRICE_DESC: descending price
    // - SortOption.RATING_DESC: highest rating first
    // - SortOption.TITLE_ASC: alphabetical title order (localeCompare)

    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Implement the pipeline described in STEPS 1-5 above.
    // Touch dependencies to satisfy strict compiler checks during initial starter state:
    void selectedCategory;
    void debouncedSearch;
    void maxPrice;
    void minRating;
    void sortOption;

    // Placeholder starter stub: returns raw products before student builds the pipeline
    return products;
  }, [products, selectedCategory, debouncedSearch, maxPrice, minRating, sortOption]);

  // Derived Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    debouncedSearch.trim().length > 0 ||
    minRating > 0 ||
    maxPrice < 1000;

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Breadcrumb & Header */}
        <div className="catalog-header">
          <div className="catalog-header__titles">
            <span className="section-eyebrow">Digital Atelier</span>
            <h1 className="catalog-header__heading">
              {selectedCategory !== 'all' ? formatCategoryName(selectedCategory) : 'All Curations'}
            </h1>
            <p className="catalog-header__count">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="catalog-header__search">
            <Search size={18} className="catalog-search__icon" />
            <input
              type="text"
              placeholder="Search in catalog..."
              value={searchInput}
              onChange={handleSearchChange}
              className="catalog-search__input"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="catalog-search__clear"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="controls-bar">
          <div className="controls-bar__left">
            <button
              type="button"
              className="controls-bar__filter-toggle"
              onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
            >
              <Filter size={16} />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Category Pills (Desktop) */}
            <div className="category-pills">
              <button
                type="button"
                className={`category-pill ${selectedCategory === 'all' ? 'category-pill--active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat ? 'category-pill--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {formatCategoryName(cat)}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-bar__right">
            <div className="sort-wrapper">
              <SlidersHorizontal size={15} className="sort-icon" />
              <label htmlFor="catalog-sort" className="sr-only">
                Sort catalog
              </label>
              <select
                id="catalog-sort"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="sort-select"
              >
                <option value={SortOption.FEATURED}>Featured Curation</option>
                <option value={SortOption.PRICE_ASC}>Price: Low to High</option>
                <option value={SortOption.PRICE_DESC}>Price: High to Low</option>
                <option value={SortOption.RATING_DESC}>Highest Customer Rating</option>
                <option value={SortOption.TITLE_ASC}>Alphabetical: A to Z</option>
              </select>
            </div>

            <ProductViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Filter Drawer / Expanded Filter Options */}
        {isFilterDrawerOpen && (
          <div className="filter-drawer">
            <div className="filter-drawer__header">
              <h3 className="filter-drawer__title">Refine Selection</h3>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="filter-drawer__close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="filter-drawer__grid">
              {/* Rating Filter */}
              <div className="filter-group">
                <label className="filter-group__label">Minimum Rating</label>
                <div className="rating-options">
                  {[0, 3, 4, 4.5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      className={`rating-btn ${minRating === stars ? 'rating-btn--active' : ''}`}
                      onClick={() => setMinRating(stars)}
                    >
                      {stars === 0 ? 'All Ratings' : `${stars}+ Stars`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="filter-group__label">Maximum Price</label>
                  <span className="filter-group__value">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="filter-slider"
                />
              </div>

              {/* Action */}
              <div className="filter-group" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button variant="outline" size="sm" onClick={handleClearFilters} leftIcon={<RotateCcw size={14} />}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="active-filters">
            <span className="active-filters__label">Active:</span>
            {selectedCategory !== 'all' && (
              <span className="filter-tag">
                Category: {formatCategoryName(selectedCategory)}
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  aria-label="Remove category filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {debouncedSearch && (
              <span className="filter-tag">
                "{debouncedSearch}"
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  aria-label="Remove search filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="filter-tag">
                Rating: {minRating}+ Stars
                <button
                  type="button"
                  onClick={() => setMinRating(0)}
                  aria-label="Remove rating filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {maxPrice < 1000 && (
              <span className="filter-tag">
                Under ${maxPrice}
                <button
                  type="button"
                  onClick={() => setMaxPrice(1000)}
                  aria-label="Remove price filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearFilters}
              className="active-filters__clear-all"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid / Loading / Error / Empty States */}
        {isLoading && <ProductGridSkeleton count={8} />}

        {isError && (
          <div className="catalog-error">
            <h3>Unable to Load Catalog</h3>
            <p>An issue occurred communicating with the catalog provider.</p>
            <Button variant="primary" onClick={() => refetch()} leftIcon={<RotateCcw size={16} />}>
              Retry Connection
            </Button>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="catalog-empty">
            <h3 className="catalog-empty__title">No Matches Found</h3>
            <p className="catalog-empty__desc">
              We couldn't find any objects matching your current search or filter combination.
            </p>
            <Button variant="primary" onClick={handleClearFilters} leftIcon={<RotateCcw size={16} />}>
              Reset All Filters
            </Button>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <div className="products-grid">
                {paginatedProducts.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="products-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {paginatedProducts.map((product: Product) => (
                  <ProductListRow
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="catalog-pagination">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <div className="catalog-pagination__pages">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        className={`catalog-page-btn ${
                          currentPage === pageNum ? 'catalog-page-btn--active' : ''
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
