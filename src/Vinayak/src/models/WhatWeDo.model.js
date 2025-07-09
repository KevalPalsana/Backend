import { Schema, model } from 'mongoose';

const WhatWeDoSchema = new Schema({
image: {
    type: String,
},
  description: {
    type: String,
    required: true,
  },
 
});

const WhatWeDo = model('WhatWeDo', WhatWeDoSchema);

export default WhatWeDo;

