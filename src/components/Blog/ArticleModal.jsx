import { Dialog } from "radix-ui";
import { X } from "lucide-react";

const ArticleModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-modal flex items-center justify-center px-4 py-8"
          onPointerDownOutside={onClose}
        >
          <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(3,14,7,0.35)] relative flex flex-col max-h-[90vh]">
            <div className="relative shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Dialog.Close
                aria-label="Close article"
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 transition"
              >
                <X className="w-5 h-5" />
              </Dialog.Close>
              {post.category && (
                <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold bg-white text-green-700">
                  {post.category}
                </span>
              )}
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <Dialog.Title className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance">
                {post.title}
              </Dialog.Title>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-5">
                <span>{post.author}</span>
                <span aria-hidden="true" className="text-green-400">
                  /
                </span>
                <time>{post.date}</time>
              </div>

              <Dialog.Description asChild>
                {/* Content is static, curated data from blogPosts.js (never user input);
                    the submit form posts to EmailJS and does not write here. Safe to render. */}
                <div
                  className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Dialog.Description>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ArticleModal;