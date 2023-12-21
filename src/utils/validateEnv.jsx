import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
    REACT_APP_SERVICE_ID: str(),
    REACT_APP_TEMPLATE_ID: str(),
    REACT_APP_USER_ID: str(),
});