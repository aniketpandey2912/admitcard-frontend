export const formValidation = (data) => {
  for (let k in data) {
    if (data[k] === "") {
      return { status: false, mssg: "All fields are required" };
    }
  }

  return { status: true };
};
