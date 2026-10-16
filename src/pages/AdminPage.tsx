/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-09B & CR-13B — Admin Price Mutation & Table Virtualization
 * Module 9 (Units 9.6, 9.9) & Module 13 (Units 13.2, 13.4)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Implement category-wide batch markdown mutation with TanStack
 *    Query cache invalidation and smooth 60fps inventory table scrolling.
 * 📁 Reference: shopsphere-solution/src/pages/AdminPage.tsx
 * ============================================================================
 */

/**
 * Administrator Operations & Inventory Management Dashboard
 * Demonstrates Module 9.6 (CRUD: POST, PUT, DELETE), 11.6 (Role-Based Access Control), 12.2 (GenericTable)
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Package,
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { useProducts } from '../hooks/useCatalog';
import { Product, OrderStatus } from '../types';
import { apiService } from '../services/api';
import { orderService } from '../services/orderService';
import { formatCategoryName, formatCurrency } from '../utils/formatters';
import { GenericTable, ColumnDefinition } from '../components/ui/GenericTable';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useAppDispatch } from '../store';
import { addToast } from '../store/slices/preferencesSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './AdminPage.css';

export const AdminPage: React.FC = () => {
  useDocumentTitle('Admin Portal');
  const dispatch = useAppDispatch();
  const { data: initialProducts, isLoading, refetch } = useProducts();

  // Local state for administrative product management
  const [products, setProducts] = useState<Product[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // CR-09B: Batch Category Price Adjustment
  const [batchCategory, setBatchCategory] = useState<string>('jewelery');
  const [batchPercentage, setBatchPercentage] = useState<number>(10);

  const handleBatchAdjustment = () => {
    const factor = 1 + batchPercentage / 100;
    setProducts((prev) =>
      prev.map((p) => {
        if (batchCategory === 'all' || p.category.toLowerCase() === batchCategory.toLowerCase()) {
          return {
            ...p,
            price: Math.round((p.price * factor + Number.EPSILON) * 100) / 100,
          };
        }
        return p;
      })
    );
    dispatch(
      addToast({
        type: 'success',
        title: 'Batch Price Adjustment Applied',
        message: `Applied ${batchPercentage > 0 ? '+' : ''}${batchPercentage}% to ${batchCategory} inventory.`,
      })
    );
  };

  // Sync initial products once loaded
  if (initialProducts && !hasInitialized) {
    setProducts(initialProducts);
    setHasInitialized(true);
  }

  // Orders overview
  const orders = orderService.getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formCategory, setFormCategory] = useState("men's clothing");
  const [formDescription, setFormDescription] = useState('');

  const openCreateModal = () => {
    setFormTitle('');
    setFormPrice(49.99);
    setFormCategory("men's clothing");
    setFormDescription('');
    setIsCreateModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormTitle(product.title);
    setFormPrice(product.price);
    setFormCategory(product.category);
    setFormDescription(product.description);
    setIsEditModalOpen(true);
  };

  // 9.6 CRUD: CREATE Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct: Product = {
      id: newId,
      title: formTitle,
      price: Number(formPrice),
      category: formCategory,
      description: formDescription,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      rating: { rate: 5.0, count: 1 },
    };

    setProducts([newProduct, ...products]);
    setIsCreateModalOpen(false);
    dispatch(
      addToast({
        type: 'success',
        title: 'Product Created',
        message: `"${formTitle}" added to store inventory.`,
      })
    );
  };

  // 9.6 CRUD: UPDATE Product (calling apiService.updateProduct)
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await apiService.updateProduct(selectedProduct.id, {
        title: formTitle,
        price: Number(formPrice),
        category: formCategory,
        description: formDescription,
      });

      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                title: formTitle,
                price: Number(formPrice),
                category: formCategory,
                description: formDescription,
              }
            : p
        )
      );

      setIsEditModalOpen(false);
      dispatch(
        addToast({
          type: 'success',
          title: 'Product Updated',
          message: `Product #${selectedProduct.id} has been modified successfully.`,
        })
      );
    } catch {
      dispatch(
        addToast({
          type: 'error',
          title: 'Update Failed',
          message: 'Unable to communicate changes to server.',
        })
      );
    }
  };

  // 9.6 CRUD: DELETE Product (calling apiService.deleteProduct)
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to retire this product from the catalog?')) return;

    try {
      await apiService.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      dispatch(
        addToast({
          type: 'info',
          title: 'Product Retired',
          message: `Product #${id} removed from catalog.`,
        })
      );
    } catch {
      dispatch(
        addToast({
          type: 'error',
          title: 'Delete Failed',
          message: 'Unable to delete product.',
        })
      );
    }
  };

  const productColumns: ColumnDefinition<Product>[] = [
    {
      key: 'id',
      header: 'ID',
      width: '60px',
      render: (p) => <span className="admin-pid">#{p.id}</span>,
    },
    {
      key: 'title',
      header: 'Product Details',
      render: (p) => (
        <div className="admin-product-cell">
          <img src={p.image} alt="" className="admin-thumb" />
          <div>
            <strong className="admin-p-title">{p.title}</strong>
            <span className="admin-p-cat">{formatCategoryName(p.category)}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Unit Price',
      render: (p) => <strong>{formatCurrency(p.price)}</strong>,
    },
    {
      key: 'rating',
      header: 'Rating Score',
      render: (p) => <span>★ {p.rating?.rate} ({p.rating?.count} reviews)</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <div className="admin-actions-cell">
          <button
            type="button"
            className="admin-action-btn admin-action-btn--edit"
            onClick={() => openEditModal(p)}
            aria-label={`Edit ${p.title}`}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            className="admin-action-btn admin-action-btn--delete"
            onClick={() => handleDeleteProduct(p.id)}
            aria-label={`Delete ${p.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <div className="admin-badge-wrap">
              <span className="badge badge-accent">
                <ShieldAlert size={14} /> Administrator Control Center
              </span>
            </div>
            <h1 className="admin-title">Catalog &amp; Operations Management</h1>
            <p className="admin-desc">
              Restricted management portal for inventory, pricing, catalog CRUD operations, and order tracking.
            </p>
          </div>
          <div className="admin-header__actions">
            <Button variant="outline" size="sm" onClick={() => refetch()} leftIcon={<RefreshCw size={14} />}>
              Refresh Remote
            </Button>
            <Button variant="primary" size="sm" onClick={openCreateModal} leftIcon={<Plus size={16} />}>
              Add New Product
            </Button>
          </div>
        </div>

        {/* Operational KPI Metric Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <Package size={22} />
            </div>
            <div>
              <span className="metric-label">Active Products</span>
              <strong className="metric-val">{products.length} Items</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon" style={{ color: 'var(--color-success)' }}>
              <DollarSign size={22} />
            </div>
            <div>
              <span className="metric-label">Simulated Gross Revenue</span>
              <strong className="metric-val">{formatCurrency(totalRevenue)}</strong>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon" style={{ color: 'var(--color-info)' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="metric-label">Customer Orders Placed</span>
              <strong className="metric-val">{orders.length} Orders</strong>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="admin-section">
          <div className="admin-section__header">
            <h2 className="admin-section__title">Catalog Inventory Items</h2>
            <span className="admin-section__count">{products.length} Managed Items</span>
          </div>

          {isLoading ? (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <div className="skeleton" style={{ width: '100%', height: '240px' }} />
            </div>
          ) : (
            <>
              {/* CR-09B: Batch Category Price Adjustment Toolbar */}
        <div className="admin-batch-toolbar" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--color-bg-subtle, #f4f4f5)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} style={{ color: 'var(--color-accent)' }} />
            <strong style={{ fontSize: '0.9rem' }}>Batch Category Price Adjustment:</strong>
          </div>
          <select
            value={batchCategory}
            onChange={(e) => setBatchCategory(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          >
            <option value="all">All Categories</option>
            <option value="jewelery">Fine Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="number"
              value={batchPercentage}
              onChange={(e) => setBatchPercentage(Number(e.target.value))}
              style={{ width: '80px', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
            />
            <span>%</span>
          </div>
          <Button size="sm" onClick={handleBatchAdjustment}>
            Apply Adjustment
          </Button>
        </div>

        <GenericTable<Product>
              data={products}
              columns={productColumns}
              keyExtractor={(p) => p.id}
            />
            </>
          )}
        </div>

        {/* Orders Fulfillment Overview */}
        <div className="admin-section" style={{ marginTop: '3rem' }}>
          <div className="admin-section__header">
            <h2 className="admin-section__title">Customer Orders Log</h2>
            <span className="admin-section__count">{orders.length} Total Orders</span>
          </div>

          {orders.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              No customer orders have been placed in this session yet.
            </p>
          ) : (
            <div className="admin-orders-list">
              {orders.map((o) => (
                <div key={o.id} className="admin-order-row">
                  <div>
                    <strong>{o.orderNumber}</strong> &bull; {o.shippingAddress.fullName}
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {o.items.length} items &bull; Total: {formatCurrency(o.total)} &bull; {o.paymentMethod}
                    </div>
                  </div>
                  <span className="badge badge-success">{OrderStatus.CONFIRMED}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREATE Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Catalog Product"
        description="Create and register a new item in the store's active inventory."
        maxWidth="md"
      >
        <form onSubmit={handleCreateProduct} className="admin-form">
          <Input
            label="Product Title"
            required
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="e.g. Tailored Wool Overshirt"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              required
              value={formPrice}
              onChange={(e) => setFormPrice(Number(e.target.value))}
            />

            <Select
              label="Department Category"
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              options={[
                { label: "Men's Clothing", value: "men's clothing" },
                { label: "Women's Clothing", value: "women's clothing" },
                { label: 'Fine Jewelry', value: 'jewelery' },
                { label: 'Electronics', value: 'electronics' },
              ]}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">Description</label>
            <textarea
              rows={3}
              className="form-field__input"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              style={{ height: 'auto', padding: '0.75rem' }}
              placeholder="Describe materials, fit, and origin..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="outline" type="button" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Publish Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Product #${selectedProduct?.id}`}
        description="Update pricing, title, or categorization for this piece."
        maxWidth="md"
      >
        <form onSubmit={handleUpdateProduct} className="admin-form">
          <Input
            label="Product Title"
            required
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              required
              value={formPrice}
              onChange={(e) => setFormPrice(Number(e.target.value))}
            />

            <Select
              label="Category"
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              options={[
                { label: "Men's Clothing", value: "men's clothing" },
                { label: "Women's Clothing", value: "women's clothing" },
                { label: 'Fine Jewelry', value: 'jewelery' },
                { label: 'Electronics', value: 'electronics' },
              ]}
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">Description</label>
            <textarea
              rows={3}
              className="form-field__input"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              style={{ height: 'auto', padding: '0.75rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Modifications
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
