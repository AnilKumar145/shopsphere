import { useAppDispatch } from '../store';
import { addToast } from '../store/slices/preferencesSlice';
import { OrderTimeline } from '../components/orders/OrderTimeline';
/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-05A & CR-08A — Order State Machine & Route Filter Sync
 * Module 5 (Units 5.1, 5.4, 5.5) & Module 8 (Units 8.1, 8.3, 8.6)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Manage order state transitions (Confirmed -> Cancelled) without
 *    array mutation and synchronize active filter tab with URL query parameters.
 * 📁 Reference: shopsphere-solution/src/pages/OrdersPage.tsx
 * ============================================================================
 */

/**
 * Order History Route
 * Demonstrates 3.5 Reusable Tables, 12.2 Generic Components (GenericTable), 12.7 Portals (Detail Modal)
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, ArrowRight, Trash2, Truck } from 'lucide-react';
import { orderService } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { GenericTable, ColumnDefinition } from '../components/ui/GenericTable';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './OrdersPage.css';

export const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  useDocumentTitle('Order History');
  const [orders, setOrders] = useState<Order[]>(() => orderService.getOrders());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCancelOrder = (orderId: string) => {
    orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
    dispatch(addToast({
      type: 'info',
      title: 'Order Cancelled',
      message: `Order #${orderId} was cancelled successfully.`,
    }));
    const updated = orderService.getOrders();
    setOrders(updated);
    setSelectedOrder(null);
  };

  const handleClearHistory = () => {
    orderService.clearOrders();
    setOrders([]);
  };

  const columns: ColumnDefinition<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Order Reference',
      render: (order) => (
        <div>
          <strong style={{ display: 'block', fontSize: 'var(--text-sm)' }}>
            {order.orderNumber}
          </strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {formatDate(order.createdAt)}
          </span>
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      render: (order) => (
        <span>
          {order.items.reduce((sum, i) => sum + i.quantity, 0)} items ({order.items.length} unique)
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Amount Paid',
      render: (order) => (
        <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)' }}>
          {formatCurrency(order.total)}
        </strong>
      ),
    },
    {
      key: 'status',
      header: 'Fulfillment Status',
      render: (order) => <span className="badge badge-success">{order.status}</span>,
    },
    {
      key: 'actions',
      header: 'Receipt',
      align: 'right',
      render: (order) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedOrder(order)}
          leftIcon={<Eye size={14} />}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <div>
            <span className="section-eyebrow">Client Purchases</span>
            <h1 className="orders-title">Order History</h1>
            <p className="orders-desc">
              Track simulated order dispatches and view historical receipts recorded in this session.
            </p>
          </div>
          {orders.length > 0 && (
            <button
              type="button"
              className="orders-clear-btn"
              onClick={handleClearHistory}
            >
              <Trash2 size={15} />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty-card">
            <div className="orders-empty-icon">
              <Package size={44} />
            </div>
            <h2 className="orders-empty-title">No Orders Recorded Yet</h2>
            <p className="orders-empty-desc">
              When you complete a simulated checkout, your order confirmation and dispatch receipt will appear here.
            </p>
            <Link to="/products" className="ui-button ui-button--primary ui-button--lg">
              <span>Explore Storefront</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <GenericTable<Order>
            data={orders}
            columns={columns}
            keyExtractor={(order) => order.id}
          />
        )}
      </div>

      {/* Order Details Modal (12.7 Portals) */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order ${selectedOrder.orderNumber}` : 'Order Details'}
        description={selectedOrder ? `Placed on ${formatDate(selectedOrder.createdAt)}` : undefined}
        maxWidth="lg"
      >
        {selectedOrder && (
          <div className="order-modal-body">
            <div className="order-modal__status-row">
            {/* Delivery Milestone Progress Timeline (CR-17B) */}
            <OrderTimeline
              currentMilestone={selectedOrder.status === OrderStatus.CANCELLED ? 'Confirmed' : 'In Transit'}
              orderTimestamp={selectedOrder.createdAt}
            />
              <div>
                <span className="order-modal__label">Status</span>
                <span className="badge badge-success" style={{ marginLeft: '8px' }}>
                  {selectedOrder.status}
                </span>
              </div>
              <span className="order-modal__payment">
                Payment: {selectedOrder.paymentMethod} (Simulated)
              </span>
            </div>

            <div className="order-modal__items">
              <h4 className="order-modal__heading">Purchased Items</h4>
              <ul className="order-modal__items-list">
                {selectedOrder.items.map((item) => (
                  <li key={item.productId} className="order-modal__item">
                    <img src={item.image} alt={item.title} className="order-modal__item-img" />
                    <div className="order-modal__item-info">
                      <strong>{item.title}</strong>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                    <span className="order-modal__item-price">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-modal__shipping">
              <Truck size={18} style={{ color: 'var(--color-accent)' }} />
              <div>
                <strong>Shipped To</strong>
                <p>
                  {selectedOrder.shippingAddress.fullName}
                  <br />
                  {selectedOrder.shippingAddress.addressLine1}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode},{' '}
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>
            </div>

            <div className="order-modal__totals">
              <div className="order-modal__totals-row">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              <div className="order-modal__totals-row">
                <span>Shipping</span>
                <span>{formatCurrency(selectedOrder.shippingFee)}</span>
              </div>
              <div className="order-modal__totals-row">
                <span>Estimated Sales Tax</span>
                <span>{formatCurrency(selectedOrder.estimatedTax)}</span>
              </div>
              <div className="order-modal__totals-row order-modal__totals-row--total">
                <span>Total Paid</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Order Cancellation Action (CR-05A) */}
            {selectedOrder.status !== OrderStatus.CANCELLED && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Change of plans? You can cancel before dispatch.
                </span>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
