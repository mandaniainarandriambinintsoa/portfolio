"use client";

type DeleteConfirmDialogProps = {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function DeleteConfirmDialog({
  open,
  title,
  onConfirm,
  onCancel,
  loading,
}: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#12122a] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold text-white">Confirmer la suppression</h3>
        <p className="text-sm text-slate-400">
          Voulez-vous vraiment supprimer <strong className="text-white">{title}</strong> ?
          Cette action est irréversible.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 rounded-xl transition-all cursor-pointer"
          >
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}
