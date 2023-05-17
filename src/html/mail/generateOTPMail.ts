const generateOTPMail = (otp: string, email: string) => {
  return `
  <body
  style="
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  "
>
  </style>
  <div
    style="background-color: #fff;"
  >
    <div
      style="padding: 40px 20px; border: 1px solid #b0b1b1; height: 100%"
    >
      <div
        style="
            display: flex;
        "
      >
        <img src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/mailchimp/Logo+Hi+Job+blue.png" alt="logo" style="width: 40px; height: 40px"; border-radius: 5px; />
        <h1
          style="
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            margin-left: 12px;
            color: #000;
          "
        >
          CHÀO MỪNG BẠN ĐẾN VỚI HIJOB!
        </h1>
      </div>
      <div style="padding: 24px 0">
        <div
          style="
            background-color: #def3ff;
            padding: 16px 0px;
          "
        >
        <div style="padding: 0 8px;">
          <p style="text-align: center; width: 100%; color: #000">
            Bạn vừa đăng nhập vào HiJob bằng tài khoản email <a style="color: #000; font-weight: 600;">${email}</a>.
          </p>
        </div>
        <div style="padding: 0 8px;">
          <p style="text-align: center; width: 100%; color: #000">
            Mã OTP xác minh đăng nhập của bạn là:
          </p>
        </div>
        </div>
        <div
          style="
            background-color: #f3f8fb;
            padding: 12px 10px;
          "
        >
            <div style="display: flex;">
                <span
                    style="
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 23px;
                    color: #000;
                    margin: 0 auto;
                    letter-spacing: 8px;
                    "
                >
                    ${otp}
                </span>
            </div>
        </div>
        <div
          style="
            padding: 16px 0px;
          "
        >
          <p style="text-align: center; width: 100%; color: #000;">
            Mã có hiệu lực trong 3 phút, vui lòng không cung cấp mã cho người
            lạ để bảo mật thông tin của bạn!
          </p>
        </div>
      </div>
      <div
        style="border-top: 1px solid #b0b1b1; padding: 24px"
      >
        <div style="display:flex;">
            <div
                style="margin: 0 auto; display: flex;"
            >
              <a href="https://www.facebook.com/hijobOfficial">
                <img
                  src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/mailchimp/ri_facebook-fill.png"
                  alt="fb-logo"
                  width="28px"
                  height="28px"
                />
              </a>
              <a href="https://www.neoworks.vn" style="margin-left: 12px;">
                <img
                  src="https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/mailchimp/mdi_link-variant.png"
                  alt=""
                  width="28px"
                  height="28px"
                  style=""
                />
              </a>
            </div>
        </div>
        <p
          style="
            text-align: center;
            margin: 20px 0;
            font-style: italic;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #575757;
          "
        >
          Copyright © *2023* *Công ty TNHH Neoworks*, All rights reserved.
        </p>
        <div
          style="text-align: center;"
        >
            <div style="margin: 0 auto;">
                <span
                    style="
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 16px;
                    text-align: center;
                    color: #575757;
                    "
                >
                    Our mailing address is:
                </span>
                <a
                    style="
                        text-decoration: underline;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 16px;
                        text-align: center;
                        color: #575757;
                    "
                    > neoworks.vn@gmail.com</a
                >
            </div>
        </div>
      </div>
    </div>
  </div>
</body>
`;
};
// SUCCESS
export default generateOTPMail;
