
export const localUserAttributes = ["name", "uname", "token", "id"]

export const setLocalUser = (user = {}) => {
  localUserAttributes.forEach((attr) => {
    localStorage.setItem(attr, user[attr]);
  });
};

export const removeLocalUser = () => {
  localUserAttributes.forEach((attr) => {
    localStorage.removeItem(attr);
  });
};

export const getLocalUser = () => {
  let data = {};
  localUserAttributes.forEach((attr) => {
    let attrValue = localStorage.getItem(attr);
    data = { ...data, [attr]: attrValue };
  });
  return data;
};

