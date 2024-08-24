
const vendorGetComplaints = async (reqBody) => {
    const society = await Society.findById(reqBody.societyId);
    if (!society) throw new ApiError(httpStatus.BAD_REQUEST, "Society not found");

    const vendor = await Vendor.findById(reqBody.vendorId);
    if (!vendor) throw new ApiError(httpStatus.BAD_REQUEST, "Vendor not found");

    const sortBy = {
        assigned: "assignedTime",
        resolved: "resolveTime",
        closed: "closedTime",
        cancel: "cancelledTime",
    }[reqBody.filter] || "createdAt";

    if (reqBody.filter === "transferred") {
        const complaint = await Vendor.populate(vendor, "transferredComplaints");
        return complaint.transferredComplaints;
    }

    const startDate = reqBody.startDate
        ? dateParser.parse(${reqBody.startDate} 00-00-00 GMT+0530, "YYYY-MM-DD HH-mm-ss [GMT]Z")
        : null;
    const endDate = reqBody.endDate
        ? dateParser.parse(${reqBody.endDate} 23-59-59 GMT+0530, "YYYY-MM-DD HH-mm-ss [GMT]Z")
        : new Date();

    const deadlineRange = reqBody.deadLine
        ? {
              $gte: dateParser.parse(${reqBody.deadLine} 00-00-00 GMT+0530, "YYYY-MM-DD HH-mm-ss [GMT]Z"),
              $lte: dateParser.parse(${reqBody.deadLine} 23-59-59 GMT+0530, "YYYY-MM-DD HH-mm-ss [GMT]Z"),
          }
        : null;

    const query = {
        vendor: reqBody.vendorId,
        ...(reqBody.deadLine && { finalDeadline: deadlineRange }),
        ...(reqBody.startDate && { [sortBy]: { $gte: startDate, $lte: endDate } }),
        ...(reqBody.categoryId && { category: reqBody.categoryId }),
        ...(reqBody.subCategoryId && { subcomplaintCategory: reqBody.subCategoryId }),
        ...(reqBody.property && { property: reqBody.property }),
        ...(reqBody.floor && { floor: reqBody.floor }),
        ...(reqBody.flat && { flat: reqBody.flat }),
        ...(reqBody.sector && { sector: reqBody.sector }),
        ...(reqBody.filter && ["assigned", "resolved", "closed", "cancel"].includes(reqBody.filter) && { status: reqBody.filter }),
        ...(reqBody.complaintTitle && { complaintTitle: { $regex: reqBody.complaintTitle.trim(), $options: "i" } }),
        ...(reqBody.complaintNumber && { complaintNumber: { $regex: reqBody.complaintNumber.trim(), $options: "i" } }),
        ...(reqBody.complainerEmail && { complainerEmail: { $regex: reqBody.complainerEmail.trim(), $options: "i" } }),
        ...(reqBody.contactNumber && { complainerPhone: { $regex: reqBody.contactNumber.trim(), $options: "i" } }),
        ...(reqBody.empId && { complainerEmpId: { $regex: reqBody.empId.trim(), $options: "i" } }),
    };

    const complaints = await Complaint.find(query)
        .sort({ [sortBy]: -1 })
        .limit(PAGE_SIZE)
        .skip((reqBody.pageNumber - 1) * PAGE_SIZE)
        .populate([
            { path: "category", select: "categoryName" },
            { path: "complainer", select: "name image email phone role" },
            { path: "flat", select: "name number" },
            { path: "floor", select: "name" },
            { path: "property", select: "name sector" },
            { path: "subcomplaintCategory", select: "subcategoryName, sector" },
            { path: "vendor", select: "name email phone image averageRating" },
        ]);

    const totalPages = await Complaint.countDocuments(query);
    const count = Math.ceil(totalPages / PAGE_SIZE);

    return { complaints, count, totalPages };
};