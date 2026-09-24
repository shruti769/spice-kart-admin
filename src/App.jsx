import { useAdminState } from './state/useAdminState'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Catalogue from './pages/Catalogue'
import ProductForm from './pages/ProductForm'
import ProductDetail from './pages/ProductDetail'
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import Delivery from './pages/Delivery'
import DriverDetail from './pages/DriverDetail'
import Promotions from './pages/Promotions'
import NewPromotion from './pages/NewPromotion'
import Payments from './pages/Payments'
import Refunds from './pages/Refunds'
import Reviews from './pages/Reviews'
import Content from './pages/Content'
import NewBanner from './pages/NewBanner'
import Notifications from './pages/Notifications'
import NewNotification from './pages/NewNotification'
import Analytics from './pages/Analytics'
import Staff from './pages/Staff'
import Settings from './pages/Settings'
import NotificationCentre from './pages/NotificationCentre'
import Login from './pages/Login'
import TwoFactor from './pages/TwoFactor'
import ForgotPassword from './pages/ForgotPassword'
import CallDriverModal from './modals/CallDriverModal'
import EditCustomerModal from './modals/EditCustomerModal'
import RowActionsModal from './modals/RowActionsModal'
import StatusModal from './modals/StatusModal'
import AssignDriverModal from './modals/AssignDriverModal'
import ContactCustomerModal from './modals/ContactCustomerModal'
import ReplyReviewModal from './modals/ReplyReviewModal'
import HideReviewModal from './modals/HideReviewModal'
import InviteStaffModal from './modals/InviteStaffModal'
import ChangePasswordModal from './modals/ChangePasswordModal'
import SessionsModal from './modals/SessionsModal'
import DateRangeModal from './modals/DateRangeModal'
import FilterDrawer from './modals/FilterDrawer'
import PrintInvoiceModal from './modals/PrintInvoiceModal'
import DeliveryZonesModal from './modals/DeliveryZonesModal'
import CancelOrderModal from './modals/CancelOrderModal'
import RefundModal from './modals/RefundModal'
import StockAdjustModal from './modals/StockAdjustModal'
import DeleteProductModal from './modals/DeleteProductModal'
import SuspendCustomerModal from './modals/SuspendCustomerModal'
import CategoryEditModal from './modals/CategoryEditModal'
import Toast from './components/Toast'

export default function App() {
  const v = useAdminState()
  return (
    <div style={{ width: "100%", height: "100dvh", minWidth: "1440px", minHeight: "600px", display: "flex", background: "#F6F7F4", position: "relative", overflow: "hidden", fontFamily: "Inter,system-ui,sans-serif" }}>
      <Sidebar v={v} />
      <main style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
        <Header v={v} />
        {v.p_dash && <Dashboard v={v} />}
        {v.p_orders && <Orders v={v} />}
        {v.p_orderdetail && <OrderDetail v={v} />}
        {v.p_catalogue && <Catalogue v={v} />}
        {v.p_productform && <ProductForm key={v.isAddMode ? 'add' : `edit-${v.editingProduct?.id ?? 'none'}`} v={v} />}
        {v.p_proddetail && <ProductDetail v={v} />}
        {v.p_cust && <Customers v={v} />}
        {v.p_custdetail && <CustomerDetail v={v} />}
        {v.p_del && <Delivery v={v} />}
        {v.p_driver && <DriverDetail v={v} />}
        {v.p_promo && <Promotions v={v} />}
        {v.p_promonew && <NewPromotion key={v.editingCoupon?.id ?? 'new'} v={v} />}
        {v.p_pay && <Payments v={v} />}
        {v.p_refunds && <Refunds v={v} />}
        {v.p_rev && <Reviews v={v} />}
        {v.p_content && <Content v={v} />}
        {v.p_bannernew && <NewBanner v={v} />}
        {v.p_notif && <Notifications v={v} />}
        {v.p_notifnew && <NewNotification v={v} />}
        {v.p_analytics && <Analytics v={v} />}
        {v.p_staff && <Staff v={v} />}
        {v.p_settings && <Settings v={v} />}
        {v.p_notifcentre && <NotificationCentre v={v} />}
      </main>
      {v.m_calldriver && <CallDriverModal v={v} />}
      {v.m_editcustomer && <EditCustomerModal v={v} />}
      {v.m_rowactions && <RowActionsModal v={v} />}
      {v.m_status && <StatusModal v={v} />}
      {v.m_assign && <AssignDriverModal v={v} />}
      {v.m_contact && <ContactCustomerModal v={v} />}
      {v.m_reply && <ReplyReviewModal v={v} />}
      {v.m_hidereview && <HideReviewModal v={v} />}
      {v.m_invite && <InviteStaffModal v={v} />}
      {v.m_password && <ChangePasswordModal v={v} />}
      {v.m_sessions && <SessionsModal v={v} />}
      {v.m_daterange && <DateRangeModal v={v} />}
      {v.m_filter && <FilterDrawer v={v} />}
      {v.m_print && <PrintInvoiceModal v={v} />}
      {v.m_zones && <DeliveryZonesModal v={v} />}
      {v.m_cancel && <CancelOrderModal v={v} />}
      {v.m_refund && <RefundModal v={v} />}
      {v.m_stockadj && <StockAdjustModal v={v} />}
      {v.m_delete && <DeleteProductModal v={v} />}
      {v.m_suspend && <SuspendCustomerModal v={v} />}
      {v.m_catedit && <CategoryEditModal v={v} />}
      {v.hasToast && <Toast v={v} />}
      {v.p_login && <Login v={v} />}
      {v.p_twofa && <TwoFactor v={v} />}
      {v.p_forgot && <ForgotPassword v={v} />}
    </div>
  )
}
