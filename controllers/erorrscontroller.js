exports.get404 = (req, res) => {
  res.render("errors/404", {
    pageTitle: "صفحه پیدا نشد | 404",
    path: "/errors",
  });
};

exports.get500 = (req, res) => {
  res.render("errors/500", {
    pageTitle: "خطا از سمت سرور |500 ",
    path: "/errors",
  });
};
