import React from 'react';
import { useState, useEffect } from 'react';
import Editor from '../Editor';
import { showSuccessToast, showErrorToast } from '../Toast';
import Spinner from '../Spinner';
import { useRouter } from 'next/router';

const FormEditNews = ({ id, content, title }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const news = JSON.parse(sessionStorage.getItem('news'));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setNewContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Do something with the title and content here
    try {
      const res = await fetch(
        `/api/news/editNews?id=${id}&title=${newTitle}&content=${newContent}`,
        {
          method: 'PUT',
        }
      );
      const data = await res.json();
      console.log(data.message);
      showSuccessToast('Cập nhật bản tin thành công');
      setTimeout(() => {
        router.reload();
      }, 5000);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        data-hs-overlay="#hs-vertically-centered-scrollable-modal"
      >
        Chỉnh sửa bản tin
      </button>

      <div
        id="hs-vertically-centered-scrollable-modal"
        className="hs-overlay fixed left-0 top-0 z-[60] hidden h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div className="m-3 mt-0 flex h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex max-h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-bold text-gray-800">Chỉnh sửa bản tin</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-sm text-gray-500 transition-all hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
                data-hs-overlay="#hs-vertically-centered-scrollable-modal"
              >
                <span className="sr-only">Đóng</span>
                <svg
                  className="h-3.5 w-3.5"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2 block font-bold text-gray-700">Tiêu đề</label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="title"
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block font-bold text-gray-700">Nội dung</label>
                    <Editor getContent={handleContentChange} defaultValue={news.content} />
                  </div>
                  <button
                    className="focus:shadow-outline flex justify-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    type="submit"
                    data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                  >
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormEditNews;
