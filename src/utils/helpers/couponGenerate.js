/* istanbul ignore file */
const generateCouponCode = () =>{
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const couponCodeLength = 8;
    let coupon = "";
    // eslint-disable-next-line no-plusplus
    for(let i=0; i<=couponCodeLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length);
        coupon+=chars.substring(randomNumber,randomNumber+1);
    }
    return coupon;
};

export default generateCouponCode;