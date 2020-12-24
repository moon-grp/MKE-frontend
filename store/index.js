

export const state = () => {
  productDetails:[]
  
}


export const mutations = {
  addProductDetails(state, payload){
    state.productDetails = payload
  }
}