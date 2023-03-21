/* eslint-disable */
const checkPermission = (permission) =>{
    return async (req,res,next) =>{
        try {
            const userPermissions = await req.user.getPermissions();
            if (!userPermissions.some(p => p.permissionName === permission)) {
                throw new Error(`User does not have permission: ${permission}`);
              }
              next();
        } catch (error) {
            res.status(403).json({ message: err.message });
        }
    }
}

const checkRole = (role) => {
    return async (req, res, next) => {
      try {
        if (req.user.Role.name !== role) {
          throw new Error(`User does not have role: ${role}`);
        }
        next();
      } catch (err) {
        res.status(403).json({ message: err.message });
      }
    }
  };