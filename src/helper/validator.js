
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  toggle: Yup.boolean().oneOf([true], "Please check agree to terms!"),
});
