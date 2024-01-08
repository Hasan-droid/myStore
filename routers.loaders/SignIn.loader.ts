export default async function SignInLoader({ params, request }) {
  const verificationFlag = request.url.split("?")[1];
  console.log("SignInLoader", verificationFlag);
  if (verificationFlag === "verified=true") {
    return {
      data: { verified: true, message: { title: "Sign up successful", description: "Now you can sign in." } },
    };
  }
  if (verificationFlag === "verified=false") {
    return { data: { verified: false, message: { title: "Sign up failed", description: "contact support" } } };
  }
  return { data: {} };
}
