import Request from "../models/request.model.js";

export const createRequest = async (req, res) => {
  const { userId, receiverId, role, name, message, comments, sentBy } =
    req.body;
  if (!userId || !receiverId || !message) {
    next(errorHandler(400, "All fields mandatory"));
  }
  // create request
  const newRequest = await Request.create({
    userId,
    receiverId,
    role,
    name,
    message,
    sentBy,
    comments,
  });
  console.log(`Request created ${newRequest}`);
  if (newRequest) {
    res.status(201).json({ message: "Request created successfully" });
  } else {
    next(errorHandler(400, "Error creating Request. Try Again"));
  }
};

export const createComment = async (req, res) => {
  const { message, name, requestId } = req.body;
  if (!message || !name) {
    next(errorHandler(400, "All fields mandatory"));
  }
  try {
    const request = await Request.findById(requestId);
    if (!request) {
      next(errorHandler(400, "No request with that id"));
    }
    // Add the new comment to the comments array
    const newComment = { name, message };
    request.comments.push(newComment);
    // Save the updated request document
    const updatedRequest = await request.save();
    // Respond with the updated request, including the new comment
    console.log(updatedRequest);
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    next(errorHandler(400, "Error creating comment. Try Again"));
  }
};
// Can be used for both students and facilitators
// their ID will be obtained from the token and used to query requests for those that match their id
export const getRequestWithId = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      next(errorHandler(400, "No such request"));
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
// Can be used for both students and facilitators
// their ID will be obtained from the token and used to query requests for those that match their id
export const getAllRequests = async (req, res) => {
  try {
    console.log(req.user);
    // id from the token
    const userId = req.user?.user?.id;
    // If the user ID is not defined, the user is not authenticated.
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(userId);
    // // retrieve requests with the user's id
    const requests = await Request.find({ userId: userId });
    console.log(requests);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const getAllRequestsFacilitators = async (req, res) => {
  try {
    console.log(req.user);
    // id from the token
    const userId = req.user?.user?.id;
    // If the user ID is not defined, the user is not authenticated.
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(userId);
    // // retrieve requests with the user's id
    const requests = await Request.find({ receiverId: userId });
    console.log(requests);
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
export const getAllRequestsAdmin = async (req, res, next) => {
  try {
    // Retrieve all requests in the database
    const requests = await Request.find();
    console.log(requests);

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
