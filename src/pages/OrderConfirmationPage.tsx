/**
 * Order Confirmation Route
 * Demonstrates 8.4 Route Parameters & Order Receipt Verification
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Truck } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './OrderConfirmationPage.css';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  useDocumentTitle('Order Confirmed');

  const order = id ? orderService.getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Order Record Not Found</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          We could not locate this order in local storage.
        </p>
        <Link to="/products" className="ui-button ui-button--primary">
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-card__badge-wrap">
            <CheckCircle size={56} className="confirmation-icon" />
          </div>

          <span className="section-eyebrow">Simulated Order Success</span>
          <h1 className="confirmation-title">Thank You For Your Order</h1>
          <p className="confirmation-lead">
            Your simulated order has been registered and confirmed. A summary receipt has been generated below.
          </p>

          {/* Key Order Meta */}
          <div className="confirmation-meta-grid">
            <div className="confirmation-meta-item">
              <span className="meta-label">Order Number</span>
              <strong className="meta-value">{order.orderNumber}</strong>
            </div>
            <div className="confirmation-meta-item">
              <span className="meta-label">Order Date</span>
              <strong className="meta-value">{formatDate(order.createdAt)}</strong>
            </div>
            <div className="confirmation-meta-item">
              <span className="meta-label">Total Amount</span>
              <strong className="meta-value">{formatCurrency(order.total)}</strong>
            </div>
            <div className="confirmation-meta-item">
              <span className="meta-label">Status</span>
              <span className="badge badge-success">{order.status}</span>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="confirmation-items-box">
            <h3 className="confirmation-subtitle">Purchased Items</h3>
            <ul className="confirmation-items-list">
              {order.items.map((item) => (
                <li key={item.productId} className="confirmation-item">
                  <img src={item.image} alt={item.title} className="confirmation-item__img" />
                  <div className="confirmation-item__info">
                    <h4 className="confirmation-item__title">{item.title}</h4>
                    <span className="confirmation-item__qty">Quantity: {item.quantity}</span>
                  </div>
                  <span className="confirmation-item__price">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Details */}
          <div className="confirmation-address-box">
            <div className="address-block">
              <Truck size={18} className="address-icon" />
              <div>
                <strong>Shipping Address</strong>
                <p>
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.addressLine1}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="confirmation-actions">
            <Link to="/orders" className="ui-button ui-button--outline ui-button--lg">
              <Package size={18} />
              <span>View in Order History</span>
            </Link>
            <Link to="/products" className="ui-button ui-button--primary ui-button--lg">
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
