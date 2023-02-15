const removeExtraSpaces = /\s{2,}/g;
const username = /^[\w. ]{3,24}$/;
const email =
    /^[\w!#$%&'*+\-/=?^`{|}~]+(?:\.[\w!#$%&'*+\-/=?^`{|}~]+)*@(?:[\w-]+\.)+([a-zA-Z]{2,})$/;
const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[\W_ ]).{8,32}$/;

export default { removeExtraSpaces, username, email, password };
