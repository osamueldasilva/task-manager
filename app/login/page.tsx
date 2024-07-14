import FormLogin from "./assets/components/form-login";

export default async function PageLogin() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <FormLogin />
      </div>
      <div className="hidden bg-muted lg:block"></div>
    </div>
  );
}
