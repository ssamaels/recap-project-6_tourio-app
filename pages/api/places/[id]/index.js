import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });

    if (!placeToUpdate) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(placeToUpdate);
  }

  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);

    if (!placeToDelete) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(placeToDelete);
  }
}
