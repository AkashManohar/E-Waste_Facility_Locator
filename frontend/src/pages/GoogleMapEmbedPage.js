import GoogleMapEmbed from "../components/GoogleMapEmbed";

export default function GoogleMapEmbedPage() {
  return (

    <div className="min-h-screen p-12 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 text-center">Nearby E-Waste Centers</h1>
      <div className="mt-6">
        <GoogleMapEmbed />
      </div>
    </div>
  );
}
