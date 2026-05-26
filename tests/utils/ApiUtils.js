class ApiUtils // class name and file name should be same
{
    constructor(apiContext, loginPayload)

    {
    this.apiContext = apiContext
    this.loginPayload = loginPayload
    }
    async getToken()
    {
    const login_response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
      {
         data:this.loginPayload
      });
   const loginRespJson = await login_response.json();
   let token = loginRespJson.token;
   console.log(token);
   return token
    }

    async createOrder(order_payload)
    {
    let response = {};
    response.token = await this.getToken();
      const order_response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: order_payload,
            headers:{
               'Authorization':response.token,
               'Content-Type':"application/json"},
         });
         const orderResponseJson = await order_response.json();
         const orderId = await orderResponseJson.orders[0];
         console.log(orderId);
         response.orderId = orderId
         return response;
    }
};

module.exports = {ApiUtils};