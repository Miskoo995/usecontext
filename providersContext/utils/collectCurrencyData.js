import http from "../../utils/http";

export default async function collectDisplayData(pagination) {
  const { data, error } = await http.get(pagination.start, pagination.limit);
  return { data, error };
}
