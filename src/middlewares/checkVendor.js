function isVendor(req, res, next) {
    try {
        if (req.user.role.roleName === "vendor") {
            next();
          } else {
              return res
                .status(401)
                .json({ status: "fail", message: req.t("Unauthorized") });
          }
    } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
    }
}

export default isVendor;