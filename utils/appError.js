class AppError extends Error{
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational =  true;
        // Capture stack trace for debugging purposes
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;


    // if (seller.plan_type === PlanType.COMMISSION) {
    //   const sellerDetails = _.pick(seller, ["first_name", "last_name", "phone_number", "email", "_id"]);

    //   const response = await PaymentService.createSubscriptionCustomer(sellerDetails);

    //   await Seller.findOneAndUpdate(
    //     { email: seller.email, _id: seller._id },
    //     {
    //       $set: { "payment_gateway.customer_code": response.customer_code },
    //     },
    //     { new: true }
    //   );
    // } else if (seller.plan_type === PlanType.SUBSCRIPTION) {
    //   const sellerDetails = _.pick(seller, ["first_name", "last_name", "phone_number", "email", "_id"]);

    //   const response = await PaymentService.createSubscriptionCustomer(sellerDetails);

    //   await Seller.findOneAndUpdate(
    //     { email: seller.email, _id: seller._id },
    //     {
    //       $set: { "payment_gateway.customer_code": response.customer_code },
    //     },
    //     { new: true }
    //   );
    // }