exports.listIdParam = async (req, res, next, listId) => {
  const list = await fetchList(listId, next);
  if (list) {
    req.list = list;
    next();
  } else {
    const err = new Error("list not found");
    err.status = 404;
    next(err);
  }
};

exports.tripIdParam = async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip not found");
    err.status = 404;
    next(err);
  }
};
