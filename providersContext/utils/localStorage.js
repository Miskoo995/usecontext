export default function checkLocalStorage(data) {
  const storageData = localStorage.getItem("currencies");
  const parsed = JSON.parse(storageData);
  if (!data) {
    if (storageData) {
      return JSON.parse(storageData);
    } else {
      return [];
    }
  } else {
    if (parsed) {
      const index = parsed.findIndex((e) => e.name === data.name);
      if (data?.provider?.reference) {
        parsed.map((p, i) => {
          if (parsed[i].name === data?.provider?.currencies[i]?.short_name) {
            parsed[i] = { ...parsed[i], valued_at: data?.provider?.currencies[i]?.value, last_login: data?.provider?.reference?.current };
          }
        });
      } else {
        if (index === -1) {
          parsed.push(data);
        } else {
          parsed[index] = data;
        }
      }
    }

    const stringify = JSON.stringify(parsed);
    localStorage.setItem("currencies", stringify);
  }
}
