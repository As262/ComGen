import { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, ShoppingBag, AlertCircle, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

const ContactPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedQueryType, setSelectedQueryType] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const queryTypes = [
    {
      id: 'order',
      title: 'Order Related Queries',
      icon: ShoppingBag,
      color: '#74543E',
      description: 'Track orders, returns, exchanges, delivery issues',
      subCategories: [
        'Track my order',
        'Cancel my order',
        'Return/Exchange product',
        'Order not received',
        'Wrong item received',
        'Damaged product'
      ]
    },
    {
      id: 'non-order',
      title: 'Non-order Related Issues',
      icon: AlertCircle,
      color: '#3b82f6',
      description: 'Account, payment, general inquiries',
      subCategories: [
        'Account issues',
        'Payment problems',
        'Product information',
        'Size guide',
        'Shipping information',
        'General inquiry'
      ]
    },
    {
      id: 'recent',
      title: 'Recent Issues',
      icon: Clock,
      color: '#f59e0b',
      description: 'View and follow up on your submitted queries',
      subCategories: [
        'View open tickets',
        'Check status',
        'Add to existing query'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping is 2-3 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns for unworn items with original tags. Free return shipping for defective items.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Log in to your account and go to "Orders" to see real-time tracking information.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 50 countries. International shipping takes 10-15 business days.'
    }
  ];

  const handleQueryTypeSelect = (queryId) => {
    setSelectedQueryType(queryId);
    setExpandedSection(null);
    setFormData(prev => ({ ...prev, subject: queryTypes.find(q => q.id === queryId)?.title || '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        order_number: formData.orderNumber || 'N/A',
        query_type: selectedQueryType,
        to_email: 'your-email@example.com' // Replace with your email
      };

      // Initialize EmailJS (you'll need to set up an account and get these IDs)
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   templateParams,
      //   'YOUR_PUBLIC_KEY'
      // );

      // For demo purposes, simulate email send
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.' 
      });
      
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: '',
        orderNumber: ''
      });
      setSelectedQueryType('');

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or email us directly at hello@ComGenZ.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Help Center</h1>
          <p className="contact-hero-subtitle">We are here to help you</p>
        </div>
      </section>

      <div className="contact-container">
        {/* Query Type Selection */}
        <section className="query-types-section">
          <h2 className="section-title">Select Query Type</h2>
          <div className="query-types-grid">
            {queryTypes.map((query, index) => {
              const Icon = query.icon;
              return (
                <div
                  key={query.id}
                  className={`query-card ${selectedQueryType === query.id ? 'active' : ''}`}
                  onClick={() => handleQueryTypeSelect(query.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="query-icon" style={{ background: `${query.color}15`, color: query.color }}>
                    <Icon size={28} />
                  </div>
                  <h3>{query.title}</h3>
                  <p>{query.description}</p>
                  <ChevronRight className="query-arrow" size={20} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Sub-categories */}
        {selectedQueryType && (
          <section className="subcategories-section">
            <h3 className="subcategories-title">
              {queryTypes.find(q => q.id === selectedQueryType)?.title}
            </h3>
            <div className="subcategories-grid">
              {queryTypes.find(q => q.id === selectedQueryType)?.subCategories.map((sub, index) => (
                <button
                  key={index}
                  className="subcategory-btn"
                  onClick={() => setFormData(prev => ({ ...prev, subject: sub }))}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Contact Form */}
        <section className="contact-form-section">
          <div className="form-container">
            <h2 className="form-title">Send us a Message</h2>
            <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>

            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your inquiry about?"
                    required
                  />
                </div>
                {selectedQueryType === 'order' && (
                  <div className="form-group">
                    <label htmlFor="orderNumber">Order Number (Optional)</label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      placeholder="#CG123456"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your inquiry in detail..."
                  rows="6"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-info-sidebar">
            <div className="info-card">
              <h3>Contact Information</h3>
              <div className="info-item">
                <Phone size={20} />
                <div>
                  <strong>Phone</strong>
                  <p>1-800-COM-GEN</p>
                </div>
              </div>
              <div className="info-item">
                <Mail size={20} />
                <div>
                  <strong>Email</strong>
                  <p>hello@ComGenZ.com</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <strong>Address</strong>
                  <p>123 Fashion Ave<br />Style City, SC 12345</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Business Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-card ${expandedSection === index ? 'expanded' : ''}`}
                onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <ChevronRight className="faq-icon" size={20} />
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta">
          <h2>Still need help?</h2>
          <p>Want to reach us old style? Here is our <a href="#postal">postal address</a></p>
          {!user && (
            <button className="cta-btn" onClick={() => navigate('/login')}>
              Log In to View Orders
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
