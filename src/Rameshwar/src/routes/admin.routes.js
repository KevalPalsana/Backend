import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get("/categories", adminController.handleGetCompanyCategories);
router.get("localCategories", adminController.getAllLocalCategories);
router.get('/products', adminController.getProducts);
router.get('/orders/shipping-status/:status', adminController.getOrdersByShippingStatus);
router.get('/user/:userId', adminController.getUserById);
// router.get('/category', adminController.getAllCategories);
router.get('/expense-categories', adminController.getAllExpenseCategory);
router.get('/expense-category/:id', adminController.getExpenseCategoryById);
router.get("/expenses", adminController.getAllExpense);
router.get('/expense/:id', adminController.getExpenseById);
router.get('/expense/:category', adminController.getExpenseByCategoryId);
router.get('/day-book', adminController.getDaybookReport);
router.get('/category/:name', adminController.fetchCategoryByName);
router.get("/download", adminController.downloadController);


// router.use(authMiddleware.authenticateUser);

router.route('/category')
  .post(adminController.createCategory);

router.route('/category/:id')
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

  router.route('/localCategory')
  .post(adminController.createLocalCategory);

router.route('/localCategory/:id')
  .put(adminController.updateLocalCategory)
  .delete(adminController.deleteLocalCategory);

router.route('/product')
  .post(adminController.createProduct);

router.route('/product/:id')
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);

router.get('/product/:barcode', adminController.scanBarcode);
router.get('/barcodes', adminController.fetchAllBarcodes);
router.post("/products/bulk-delete", adminController.handleBulkDelete);
router.post("/products/bulk-print", adminController.handleBulkPrint);

router.route('/bill')
  .post(adminController.createBill)

router.route('/bill/:id')
  .put(adminController.updateBill)
  .get(adminController.getBillById)
  .delete(adminController.deleteBill);

router.get('/download/csv', adminController.downloadBillsCSV);
router.get('/download/pdf', adminController.downloadBillsPDF);
router.get('/bills', adminController.getAllSalesBills);
router.get('/bills/create-date/:createDate', adminController.getSaleBillsByCreateDate);
router.get('/bills/bill-date/:billDate', adminController.getSaleBillsByBillDate);
router.get('/bills/product-name/:productName', adminController.getSaleBillsByProductName);
router.get('/bills/hsnsac/:hsnSac', adminController.getSaleBillsByHSNSAC);
router.get('/bills/quantity/:quantity', adminController.getSaleBillsByQuantity);
router.get('/bills/rate/:rate', adminController.getSaleBillsByRate);
router.get('/bills/per/:per', adminController.getSaleBillsByPer);
router.get('/bills/total-amount/:finalTotal', adminController.getSaleBillsByTotalAmount);
router.get('/bills/customer-name/:customerName', adminController.getSaleBillsByCustomerName);
router.get('/bills/companyId/:companyId', adminController.getSaleInvoicesByCompanyIdController);


router.route('/purchase-bill')
.post(adminController.createPurchaseBill);

router.route('/purchase-bill/:id')
.put(adminController.updatePurchaseBill)
.get(adminController.getPurchaseBillById)
.delete(adminController.deletePurchaseBill);

router.get('/purchase-download/csv', adminController.downloadPurchaseBillsCSV);
router.get('/purchase-download/pdf', adminController.downloadPurchaseBillsPDF);
router.get('/purchase-bills', adminController.getAllPurchaseBills);
router.get('/purchase-bills/create-date/:createDate/:billType', adminController.getPurchaseBillsByCreateDate);
router.get('/purchase-bills/bill-date/:billDate/:billType', adminController.getPurchaseBillsByBillDate);
router.get('/purchase-bills/product-name/:productName/:billType', adminController.getPurchaseBillsByProductName);
router.get('/purchase-bills/hsnsac/:hsnSac/:billType', adminController.getPurchaseBillsByHSNSAC);
router.get('/purchase-bills/quantity/:quantity/:billType', adminController.getPurchaseBillsByQuantity);
router.get('/purchase-bills/rate/:rate/:billType', adminController.getPurchaseBillsByRate);
router.get('/purchase-bills/per/:per/:billType', adminController.getPurchaseBillsByPer);
router.get('/purchase-bills/discount/:discount/:billType', adminController.getPurchaseBillsByDiscount);
router.get('/purchase-bills/total-amount/:finalTotal/:billType', adminController.getPurchaseBillsByTotalAmount);
router.get('/purchase-bills/payment-status/:paymentStatus/:billType', adminController.getPurchaseBillsByPaymentType);
router.get('/purchase-bills/vendor-name/:vendorName/:billType', adminController.getPurchaseBillsByVendorName);
router.get('/purchase-bills/actual', adminController.getPurchaseBillsByActualBillType);
router.get('/purchase-bills/adp', adminController.getPurchaseBillsByADPBillType);

router.route('/local-purchase-bill')
.post(adminController.createLocalPurchaseBill);

router.route('/local-purchase-bill/:id')
.put(adminController.updateLocalPurchaseBill)
.get(adminController.getLocalPurchaseBillById)
.delete(adminController.deleteLocalPurchaseBill);

router.get('/local-purchase-download/csv', adminController.downloadLocalPurchaseBillsCSV);
router.get('/local-purchase-download/pdf', adminController.downloadLocalPurchaseBillsPDF);
router.get('/local-purchase-bills', adminController.getAllLocalPurchaseBills);
router.get('/local-purchase-bills/create-date/:createDate', adminController.getLocalPurchaseBillsByCreateDate);
router.get('/local-purchase-bills/bill-date/:billDate', adminController.getLocalPurchaseBillsByBillDate);
router.get('/local-purchase-bills/product-name/:productName', adminController.getLocalPurchaseBillsByProductName);
router.get('/local-purchase-bills/quantity/:quantity', adminController.getLocalPurchaseBillsByQuantity);
router.get('/local-purchase-bills/rate/:rate', adminController.getLocalPurchaseBillsByRate);
router.get('/local-purchase-bills/per/:per', adminController.getLocalPurchaseBillsByPer);
router.get('/local-purchase-bills/discount/:discount', adminController.getLocalPurchaseBillsByDiscount);
router.get('/local-purchase-bills/total-amount/:finalTotal', adminController.getLocalPurchaseBillsByTotalAmount);
router.get('/local-purchase-bills/payment-status/:paymentStatus', adminController.getLocalPurchaseBillsByPaymentType);

router.route('/gst')
  .post(adminController.createGST)
  .get(adminController.getGST);

  router.route('/info')
  .post(adminController.createInfo)
  .get(adminController.getInfo);


  router.route('/info/:id')
  .put(adminController.updateInfo)
  .get(adminController.getCategroyById)
  .delete(adminController.deleteInfo);

router.get("/info/:userId", adminController.getCompanyInfoByUserId);

router.route('/po-number')
.post(adminController.createPONumber)
.get(adminController.getPONumber);

router.route('/po-number/:id')
.put(adminController.updatePONumber)
.delete(adminController.deletePONumber);

router.get("/po-number/:companyId", adminController.getPONumberByCompanyId);
router.get("/po-number/:poNumber", adminController.getPoDetailsByNumber);
router.get("/po/:id", adminController.getPONumberById);
router.get("/po-by-assign/:assignId", adminController.getPONumberByAssignId);


router.route('/wallet-amount')
  .post(adminController.createWalletAmount)
  .get(adminController.getWalletAmount);

router.route('/wallet-amount/:id')
  .put(adminController.updateWalletAmount)
  .delete(adminController.deleteWalletAmount);

router.route('/item-detail')
  .post(adminController.createItemDetails)
  .get(adminController.getItemDetails);

router.route('/item-detail/:id')
  .put(adminController.updateItemDetails)
  .delete(adminController.deleteItemDetails);

router.get('/orderList', adminController.getOrderList);
router.get('/order/:id', adminController.getOrderById);
router.put('/update-status/:orderId', adminController.updatePaymentStatus);
router.put('/update-order-status/:orderId', adminController.updateOrderStatus);
router.put('/update-shipping-status/:orderId', adminController.updateShippingStatusService)

router.route('/vendor')
  .post(adminController.createVendor)
  .get(adminController.getVendor);

router.route('/vendor/:id')
  .put(adminController.updateVendor)
  .get(adminController.getVendorById)
  .delete(adminController.deleteVendor);
  
  router.get('/vendor-by-name/:name', adminController.getVendorByName);

  router.route('/customer')
  .post(adminController.createCustomer)
  .get(adminController.getCustomers);

router.route('/customer/:id')
  .put(adminController.updateCustomer)
  .get(adminController.getCustomerById)
  .delete(adminController.deleteCustomer);

router.get('/customer-by-name/:name', adminController.getCustomerByName);
router.get("/dashboard", adminController.getDashboardStatsController);

router.route('/expense')
  .post(adminController.createExpense)

router.route('/expense/:id')
  .put(adminController.updateExpense)
  .delete(adminController.deleteExpense);

  router.route('category')
  .post(adminController.createCategory)

router.route('/category/:id')
  .put(adminController.updateCategory)
  .get(adminController.getCategroyById)
  .delete(adminController.deleteCategory);

  router.route('/expense-category')
  .post(adminController.createExpeneCategroy)

router.route('/expense-category/:id')
  .put(adminController.updateExpenseCategory)
  .delete(adminController.deleteExpenseCategory);


router.route('/poll/:id')
.put(adminController.updatePoll)
.delete(adminController.deletePoll);

router.route('/role')
.post(adminController.createRole)
.get(adminController.getAllRoles);

router.route('/role/:id')
.put(adminController.updateRole)
.get(adminController.getRoleById)
.delete(adminController.deleteRole);

router.route('/delivery-challan')
.post(adminController.createChallan)
.get(adminController.getAllChallans); 

router.route('/delivery-challan/:id')
.put(adminController.updateChallan)
.get(adminController.getChallanById)
.delete(adminController.deleteChallan);

router.route('/role-user')
.post(adminController.createRoleUser)
.get(adminController.getAllRoleUsers);

router.route('/role-user/:id')
.put(adminController.updateRoleUser)
.get(adminController.getRoleUserById)
.delete(adminController.deleteRoleUser);

router.route('/assign-task')
.post(adminController.createAssignTask)
.get(adminController.getAllTasks);

router.get('/assign-task/:companyId', adminController.getTasksByCompanyId);

router.post('/upload', upload.single('file'), adminController.uploadWarranty);

router.post('/add/warranty', adminController.addMultipleWarrantyNumbers);

router.get("/dashboard", adminController.fetchDashboardData);


router.route("/poll")
.post(adminController.createPoll)
.get(adminController.getPolls);

router.get("/poll/:id", adminController.getUsage);

router.post("/broken-poll", adminController.createBrokenPoll);
router.get("/broken-polls", adminController.getAllBrokenPolls);
router.get("/broken-poll/:polId", adminController.getBrokenPollsByPollId);
router.delete("/broken-poll/:id", adminController.deleteBrokenPoll);

router.get("/poll-by-company/:companyId", adminController.getPollByCompanyController);


router.route("/pgvcl-poll")
.post(adminController.createPGVCLPoll)
.get(adminController.getPGVCLPolls);

router.get("/pgvcl-poll/:id", adminController.getUsagePGVCL);

router.post("/pgvcl-broken-poll", adminController.createPGVCLBrokenPoll);
router.get("/pgvcl-broken-polls", adminController.getAllPGVCLBrokenPolls);
router.get("/pgvcl-broken-poll/:polId", adminController.getPGVCLBrokenPollsByPollId);
router.delete("/pgvcl-broken-poll/:id", adminController.deletePGVCLBrokenPoll);

router.get(
  '/assigned-task/list',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles('manager'),
  adminController.getAssignedTasksForManager
);

router.get(
  '/assigned-task/:taskId',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles('manager'),
  adminController.getTaskDetailsById
);

router.get(
  '/assigned-task/notifications/list',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles('manager'),
  adminController.getTaskNotifications
);


router.post("/gst", adminController.createGSTEntry);
router.get("/gst", adminController.getGSTEntries);
router.get("/gst/monthly", adminController.getMonthlyGST);
router.put("/gst/:id", adminController.updateGSTEntry);
router.delete("/gst/:id", adminController.deleteGSTEntry);


router.post('/add-payment/adp/:id', adminController.addPaymentToAdpBill);

router.post("/add-payment/:billId", adminController.addPayment);
router.post("/add-return-commission/:billId", adminController.addReturnAndCommission);

router.post("/save-po-document", adminController.saveDocumentToPOController);

router.get("/po-documents/:poId",adminController.getPoDocuments);

router.delete("/delete-po-document/:id", adminController.deletePDF);

router.put("/update-stock/:id", adminController.updateStockController);

router.put('/decrease-stock/:categoryId', adminController.decreaseStockController);

router.put("/update-adp-stock/:id", adminController.updateAdpStockController);

router.put('/decrease-adp-stock/:categoryId', adminController.decreaseAdpStockController);

router.post("/create-folder", adminController.createFolderController);
router.put("/rename-folder", adminController.renameFolderController);
router.delete('/delete-folder', adminController.deleteFolderController);
router.post("/upload-image-to-folder", adminController.uploadImageToFolderController);
router.put("/delete-image", adminController.deleteImageFromFolder);
router.get("/get-folder-images/:companyId/:folderIndex", adminController.getImagesFromFolder);
router.get("/get-folders/:companyId", adminController.getAllFoldersController);

router.get("/monthly-gst-report", adminController.getMonthlyGstReport);



export default router;
