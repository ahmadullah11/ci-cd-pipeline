const app = require("./app");

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My Node.Js App";
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

app.listen(PORT, () => {
    console.log(
        `${APP_NAME} is running on port ${PORT} in ${ENVIRONMENT} mode`
    );
});