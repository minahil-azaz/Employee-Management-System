import Employee from "../models/Employee.js";

// ======================
// GET PROFILE
// GET /api/profile
// ======================

export const getProfile = async (req, res) => {
    try {
        const user = req.user;

        const employee = await Employee.findOne({
            userId: user.userId,
        })
            .populate("userId", "email role")
            .lean();

        if (!employee) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        return res.json({
            id: employee._id.toString(),
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.userId?.email,
            role: employee.userId?.role,
            bio: employee.bio || "",
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({
            message: "Failed to fetch profile information",
        });
    }
};

// ======================
// UPDATE PROFILE
// PUT /api/profile
// ======================

export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { firstName, lastName, bio } = req.body;

        const employee = await Employee.findOne({
            userId: user.userId,
        });

        if (!employee) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        if (employee.isDelete) {
            return res.status(400).json({
                message: "Profile is already deleted",
            });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee._id,
            {
                firstName: firstName || employee.firstName,
                lastName: lastName || employee.lastName,
                bio: bio || employee.bio,
            },
            { new: true }
        );

        return res.json({
            message: "Profile updated successfully",
            profile: {
                id: updatedEmployee._id.toString(),
                firstName: updatedEmployee.firstName,
                lastName: updatedEmployee.lastName,
                bio: updatedEmployee.bio,
            },
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "Failed to update profile information",
        });
    }
};