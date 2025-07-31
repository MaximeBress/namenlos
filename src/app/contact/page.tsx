"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { ContactFormData } from "@/typing";

export default function Contact() {
  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Votre nom est requis"),
      email: yup
        .string()
        .email("Veuillez entrer une adresse email valide")
        .required("Votre email est requis"),
      message: yup
        .string()
        .min(5, "Votre message doit contenir au moins 5 caractères")
        .required("Votre message est requis"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ContactFormData) => {
    fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("Votre message a bien été envoyé !", {
          position: "bottom-left",
        });
        reset({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch(() => {
        toast.error("Il y'a eu une erreur lors de l'envoi du message !", {
          position: "bottom-left",
        });
      });
  };

  return (
    <form
      className="bg-primary-50 container mx-auto flex w-4/5 flex-col gap-5 rounded-lg p-10 xl:w-1/2 2xl:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">Contactez nous !</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row">
          <input
            type="text"
            className="flex-1 rounded-sm bg-white px-4 py-3"
            placeholder="Votre nom"
            {...register("name", { required: true })}
          />

          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 rounded-sm bg-white px-4 py-3"
            {...register("email", { required: true })}
          />
        </div>
        <textarea
          placeholder="Votre message"
          className="rounded-sm bg-white px-4 py-3"
          rows={5}
          {...register("message", { required: true })}
        ></textarea>
        {(errors["name"] || errors["email"] || errors["message"]) && (
          <div className="flex flex-col gap-2 text-red-600">
            <span>{errors["name"]?.message}</span>
            <span>{errors["email"]?.message}</span>
            <span>{errors["message"]?.message}</span>
          </div>
        )}
        <button
          type="submit"
          className="min-w-32 cursor-pointer rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
