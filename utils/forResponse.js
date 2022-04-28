function forResponse(promise) {
  return promise
    .then((data) => {
      return { data };
    })
    .catch((error) => {
      return { error };
    });
}

export default forResponse;
