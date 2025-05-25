import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { loginUser } from "../../services/auth";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { RootState } from "../../store";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      loginSchema.parse(formData);
      
      dispatch(loginStart());
      const result = await loginUser(formData.email, formData.password);
      dispatch(loginSuccess(result));
      navigate("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0].toString()] = error.message;
          }
        });
        setValidationErrors(errors);
      } else {
        dispatch(loginFailure("Email ou mot de passe incorrect"));
      }
    }
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <div className="bg-[url(/backgrounds-a.svg)] bg-[100%_100%] w-full h-screen bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col w-full h-full items-center justify-center">
          <div className="flex flex-col items-center gap-8 py-16 w-full max-w-md">
            <div className="flex items-center py-[82px]">
              <img
                className="w-[400px] h-[250px] sm:w-[300px] sm:h-[200px] md:w-[350px] md:h-[225px] lg:w-[400px] lg:h-[250px] xl:w-[500px] xl:h-[300px] object-contain"
                alt="Logo arc"
                src="/logo-arc.svg"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[340px] gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="[font-family:'Quicksand',Helvetica] font-semibold text-black text-xs leading-[18px]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email . . ."
                  className="bg-[#fffbf1] rounded-[31px] shadow-frame-drop-shadow px-4 py-2 h-auto [font-family:'Quicksand',Helvetica] font-normal text-[#75746f] text-base tracking-[0.20px] leading-7 border-none"
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="[font-family:'Quicksand',Helvetica] font-semibold text-black text-xs leading-[18px]"
                >
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mot de passe . . ."
                  className="bg-[#fffbf1] rounded-[31px] shadow-frame-drop-shadow px-4 py-2 h-auto [font-family:'Quicksand',Helvetica] font-normal text-[#75746f] text-base tracking-[0.20px] leading-7 border-none"
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm">{validationErrors.password}</p>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 bg-[#4b4a47] rounded-[32px] px-5 py-3 h-auto [font-family:'Quicksand',Helvetica] font-medium text-[#fffbf1] text-base tracking-[-0.16px] leading-5 shadow-[0px_1px_2px_#1018280d] hover:bg-[#3a3937] disabled:opacity-50"
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};