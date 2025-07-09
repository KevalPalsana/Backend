import { Schema, model } from 'mongoose';

const itemDetailsSchema = new Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: "SPJProduct", 
},
barcode: {
    type: String,
},
}, {timestemp: true});

itemDetailsSchema.pre('save', async function (next) {
  const item = this; 

  const Product = model('SPJProduct'); 

  try {
    const product = await Product.findById(item.productId);

    if (!product) {
      return next(new Error('Invalid productId: Product not found.'));
    }

    if (product.barCode !== item.barcode) {
      return next(new Error('Barcode does not match the product.barCode.'));
    }

    next();
  } catch (error) {
    next(error); 
  }
});

itemDetailsSchema.statics.calculateTotals = async function () {
  const items = await this.find().populate('productId'); 

  const totalCount = items.length;

  const totalGrossWeight = items.reduce((acc, item) => {
    return acc + (item.productId.grossWeight || 0);
  }, 0);

  const totalNetWeight = items.reduce((acc, item) => {
    return acc + (item.productId.netWeight || 0);
  }, 0);

  return { totalCount, totalGrossWeight, totalNetWeight };
};

const ItemDetails = model('ItemDetails', itemDetailsSchema);

export default ItemDetails;

