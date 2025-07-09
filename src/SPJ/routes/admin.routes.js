import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/categories', adminController.getGroups);
router.get('/group-items', adminController.getGroupItem);
router.get('/products', adminController.getProducts);
router.get('/non-barcode/products', adminController.getNonBarcodeProducts)
router.get('/orders/shipping-status/:status', adminController.getOrdersByShippingStatus);
router.get('/user/:userId', adminController.getUserById);
router.get('/metals', adminController.getMetal),
router.get('/non-barcode-categories', adminController.getAllCategories);
router.get('/expense-categories', adminController.getAllExpenseCategory);
router.get('/expense-category/:id', adminController.getExpenseCategoryById);
router.get("/expenses", adminController.getAllExpense);
router.get('/expense/:id', adminController.getExpenseById);
router.get('/expense/:category', adminController.getExpenseByCategoryId);
router.get('/day-book', adminController.getDaybookReport);

router.use(authMiddleware.authenticateUser);


router.route('/category')
  .post(adminController.createGroup);

router.route('/category/:id')
  .put(adminController.updateGroup)
  .delete(adminController.deleteGroup);

router.route('/size')
  .post(adminController.createSize)
  .get(adminController.getSize);

router.route('/size/:id')
  .put(adminController.updateSize)
  .get(adminController.getSizeByItemId)
  .delete(adminController.deleteSize);

router.route('/design')
  .post(adminController.createDesign)
  .get(adminController.getDesign);

router.route('/design/:id')
  .put(adminController.updateDesign)
  .get(adminController.getDesign)
  .delete(adminController.deleteDesign);

router.route('/market-rate')
  .post(adminController.createMarketRate)
  .get(adminController.getMarketRate);

router.get("/market-rates", adminController.getMarketRateByCategoryId);

router.route('/market-rate/:id')
  .put(adminController.updateMarketRate)
  .delete(adminController.deleteMarketRate);

router.route('/group-item')
  .post(adminController.createGroupItem)

router.route('/group-item/:id')
  .put(adminController.updateGroupItem)
  .delete(adminController.deleteGroupItem);

router.route('/metal')
.post(adminController.createMetal)

router.route('/metal/:id')
.put(adminController.updateMetal)
.delete(adminController.deleteMetal);

router.route('/product')
  .post(adminController.createProduct);

router.route('/product/:id')
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);


router.get('/productFaqs', adminController.getFaqs)
// router.get('/group-item/:groupId', adminController.getGroupItemByGroupId);
router.delete('/product/:id/faq', adminController.deleteFAQ)
router.get('/product/:barcode', adminController.scanBarcode);
router.post('/product/scan', adminController.getProductByBarCode);
router.get('/product-by-location', adminController.getProductByLocation);
router.get('/product-by-group', adminController.getProductByGroupId);
router.get('/product-by-item', adminController.getProductsByGroupItemId);
router.get('/product-by-design', adminController.getProductByDesign);
router.get('/product-by-size', adminController.getProductBySize);
router.get('/product-by-weight', adminController.getProductsByGrossWeight);
router.get('/product-by-date', adminController.getProductsByDate); 
router.get('/product-by-fine-weight', adminController.getProductsByFineWeight); 
router.get('/product-by-net-weight', adminController.getProductsByNetWeight); 
router.get('/product-by-labour', adminController.getProductsByLabour); 
router.get('/product-by-wastage', adminController.getProductsByWastage); 
router.get('/product-by-hsncode', adminController.getProductsByHsnCode); 
router.get('/product-by-groupName', adminController.getProductsByGroupName); 
router.get('/product-by-silver-rate', adminController.getProductsBySilverRate); 
router.get('/product-by-account', adminController.getProductsByAccount);
router.get('/product-by-extra-rate', adminController.getProductsByExtraRate); 
router.get('/product-by-pcs', adminController.getProductsByPcs); 
router.get('/product-by-moti', adminController.getProductsByMoti); 
router.get('/product-by-stone', adminController.getProductsByStone); 
router.get('/product-by-jadatr', adminController.getProductsByJadatr); 
router.get('/product-by-huid', adminController.getProductsByHuid); 
router.get('/product-by-huid-rule', adminController.getProductsByHuidRule); 
router.get('/product-by-huid-charge', adminController.getProductsByHuidCharge); 
router.get('/product-by-total-price', adminController.getProductsByTotalPrice); 
router.get('/product-by-market-rate-used', adminController.getProductsByMarketRateUsed); 
router.get('/product-by-calculated-rate', adminController.getProductsByCalculatedMarketRate); 
router.get('/product-by-gme-price', adminController.getProductsByGMEPrice); 
router.get('/product-by-gst', adminController.getProductsByGst); 
router.get('/product-by-final-price', adminController.getProductsByFinalPrice);
router.get('/barcodes', adminController.fetchAllBarcodes);
router.get("/product/barcode/:barcode", adminController.getBarcodeImage);
router.post("/products/bulk-delete", adminController.handleBulkDelete);
router.post("/products/bulk-print", adminController.handleBulkPrint);

router.route('/non-barcode/product')
  .post(adminController.createNonBarcodeProduct);

router.route('/non-barcode/product/:id')
  .put(adminController.updateNonBarcodeProduct)
  .delete(adminController.deleteNonBarcodeProduct);

router.get('/non-barcode/product-by-location', adminController.getNonProductByLocation);
router.get('/non-barcode/product-by-group', adminController.getNonProductByGroupId);
router.get('/non-barcode/product-by-item', adminController.getNonProductsByGroupItemId);
router.get('/non-barcode/product-by-fine-weight', adminController.getNonProductsByFineWeight);
router.get('/non-barcode/product-by-net-weight', adminController.getNonProductsByNetWeight);
router.get('/non-barcode/product-by-calculated-market-rate', adminController.getNonProductsByCalculatedMarketRate);
router.get('/non-barcode/product-by-weight', adminController.getNonProductsByGrossWeight);
router.get('/non-barcode/product-by-final-price', adminController.getNonProductsByFinalPrice);
router.get('/non-barcode/product-by-fine-weight', adminController.getNonProductsByFineWeight);
router.get('/non-barcode/product-by-gme-price', adminController.getNonProductsByGMEPrice);
router.get('/non-barcode/product-by-gst', adminController.getNonProductsByGst);
router.get('/non-barcode/product-by-market-rate', adminController.getNonProductsByMarketRateUsed);
router.get('/non-barcode/product-by-total-price', adminController.getNonProductsByTotalPrice); 

router.route('/labour-rate')
  .post(adminController.createLabourRate)
  .get(adminController.getLabourRate);

router.route('/labour-rate/:id')
  .put(adminController.updateLabourRate)
  .get(adminController.getLabourRateByItem)
  .delete(adminController.deleteLabourRate);

  router.route('/bill')
  .post(adminController.createBill)
  .get(adminController.getAllBills);

router.route('/bill/:id')
  .put(adminController.updateBill)
  .get(adminController.getBillById)
  .delete(adminController.deleteBill);

router.get('/download/csv', adminController.downloadBillsCSV);
router.get('/download/pdf', adminController.downloadBillsPDF);

router.route('/purchase-bill')
.post(adminController.createPurchaseBill)
.get(adminController.getAllPurchaseBills);

router.route('/purchase-bill/:id')
.put(adminController.updatePurchaseBill)
.get(adminController.getPurchaseBillById)
.delete(adminController.deletePurchaseBill);

router.get('/purchase-download/csv', adminController.downloadPurchaseBillsCSV);
router.get('/purchase-download/pdf', adminController.downloadPurchaseBillsPDF);


router.route('/huid-rule')
  .post(adminController.createHUIDRule)
  .get(adminController.getHUIDRule);

router.route('/huid-rule/:id')
  .put(adminController.updateHUIDRule)
  .delete(adminController.deleteHUIDRule);

router.route('/gst')
  .post(adminController.createGST)
  .get(adminController.getGST);

  router.route('/info')
  .post(adminController.createInfo)
  .get(adminController.getInfo);

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

router.route('/state')
  .post(adminController.createState)
  .get(adminController.getState);

router.route('/state/:id')
  .put(adminController.updateState)
  .delete(adminController.deleteState);

router.get('/orderList', adminController.getOrderList);
router.get('/order/:id', adminController.getOrderById);
router.put('/update-status/:orderId', adminController.updatePaymentStatus);
router.put('/update-order-status/:orderId', adminController.updateOrderStatus);
router.put('/update-shipping-status/:orderId', adminController.updateShippingStatusService)

router.route('/customer')
  .post(adminController.createCustomer)
  .get(adminController.getCustomer);

router.route('/customer/:id')
  .put(adminController.updateCustomer)
  .get(adminController.getCustomerById)
  .delete(adminController.deleteCustomer);

router.get('/customer-by-city/:city', adminController.getCustomerByCity);
router.get('/customer-by-name/:name', adminController.getCustomerByName);

router.route('/expense')
  .post(adminController.createExpense)

router.route('/expense/:id')
  .put(adminController.updateExpense)
  .delete(adminController.deleteExpense);

router.route('/city')
  .post(adminController.createCity)
  .get(adminController.getCity);

router.route('/city/:id')
  .put(adminController.updateCity) 
  .delete(adminController.deleteCity);

  router.route('/serial-no')
  .post(adminController.createSerialNo)
  .get(adminController.getSerialNos);

  router.route('/uchak')
  .post(adminController.createUchak)
  .get(adminController.getAllUchak);

router.route('/uchak/:id')
  .put(adminController.updateUchak)
  .get(adminController.getUchakById)
  .delete(adminController.deleteUchak);

  router.route('/percentage')
  .post(adminController.createPercentage)
  .get(adminController.getAllPercentage);

router.route('/percentage/:id')
  .put(adminController.updatePercentage)
  .get(adminController.getPercentageById)
  .delete(adminController.deletePercentage);

  router.route('/pergram')
  .post(adminController.createPerGram)
  .get(adminController.getAllPerGram);

router.route('/pergram/:id')
  .put(adminController.updatePerGram)
  .get(adminController.getPerGramById)
  .delete(adminController.deletePerGram);


  router.route('/non-uchak')
  .post(adminController.createNonUchak)
  .get(adminController.getAllNonUchak);

router.route('/non-uchak/:id')
  .put(adminController.updateNonUchak)
  .get(adminController.getNonUchakById)
  .delete(adminController.deleteNonUchak);

  router.route('/non-percentage')
  .post(adminController.createNonPercentage)
  .get(adminController.getAllNonPercentage);

router.route('/non-percentage/:id')
  .put(adminController.updateNonPercentage)
  .get(adminController.getNonPercentageById)
  .delete(adminController.deleteNonPercentage);

  router.route('/non-pergram')
  .post(adminController.createNonPerGram)
  .get(adminController.getAllNonPerGram);

router.route('/non-pergram/:id')
  .put(adminController.updateNonPerGram)
  .get(adminController.getNonPerGramById)
  .delete(adminController.deleteNonPerGram);

  router.route('/non-barcode-category')
  .post(adminController.createCategory)

router.route('/non-barcode-category/:id')
  .put(adminController.updateCategory)
  .get(adminController.getCategroyById)
  .delete(adminController.deleteCategory);

  router.route('/expense-category')
  .post(adminController.createExpeneCategroy)

router.route('/expense-category/:id')
  .put(adminController.updateExpenseCategory)
  .delete(adminController.deleteExpenseCategory);

router.route('/role')
.post(adminController.createRole)
.get(adminController.getAllRoles);

router.route('/role/:id')
.put(adminController.updateRole)
.get(adminController.getRoleById)
.delete(adminController.deleteRole);
router.route('/role-user')
.post(adminController.createRoleUser)
.get(adminController.getAllRoleUsers);

router.route('/role-user/:id')
.put(adminController.updateRoleUser)
.get(adminController.getRoleUserById)
.delete(adminController.deleteRoleUser);

router.get('/city-by-state/:stateId', adminController.getCityByState);

router.post('/upload', upload.single('file'), adminController.uploadWarranty);

router.post('/add/warranty', adminController.addMultipleWarrantyNumbers);

router.get('/productDetails', adminController.getNonBarcodetProductDetails);

router.get("/dashboard", adminController.fetchDashboardData);



export default router;
