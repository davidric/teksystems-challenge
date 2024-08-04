import React from 'react';

const SantaLetterForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between items-center">
      <header className="w-full py-4 bg-white text-gray-900 text-center border-b border-gray-200">
        <h1 className="text-2xl md:text-3xl font-serif">A Letter to Santa</h1>
      </header>

      <main className="flex flex-col items-center w-full flex-1 p-4 md:p-6">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-6 md:p-8">
          <p className="font-serif text-lg md:text-xl mb-4 md:mb-6 text-gray-900">
            Ho ho ho, what do you want for Christmas?
          </p>

          <label
            htmlFor="userid"
            className="block mb-2 text-gray-600 font-medium"
          >
            Who are you?
          </label>
          <input
            id="userid"
            name="userid"
            placeholder="charlie.brown"
            className="border border-gray-300 rounded-lg p-2 md:p-3 mb-4 w-full focus:border-black focus:ring-0"
          />

          <form method="post" className="flex flex-col">
            <label
              htmlFor="wish"
              className="block mb-2 text-gray-600 font-medium"
            >
              What do you want for Christmas?
            </label>
            <textarea
              id="wish"
              name="wish"
              rows={4}
              maxLength={100}
              placeholder="Gifts!"
              className="border border-gray-300 rounded-lg p-2 md:p-3 mb-4 w-full focus:border-black focus:ring-0 min-h-32"
            ></textarea>
            <button
              type="button"
              id="submit-letter"
              className="bg-black text-white rounded-lg py-2 md:py-3 px-4 md:px-6 hover:bg-gray-800 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <footer className="w-full py-4 bg-white text-gray-900 text-center border-t border-gray-200">
        Made by{' '}
        <a
          href="https://davidrica.com"
          target="_blank"
          className="text-black hover:underline"
        >
          David Ricardo
        </a>
        !
      </footer>

      <div className="fixed top-5 right-5">
        <script src="https://button.glitch.me/button.js"></script>
      </div>
    </div>
  );
};

export default SantaLetterForm;
