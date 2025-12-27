// import { useState, useEffect } from "react";
// import axios from "axios";

// const useAxios = ({ url, method = "GET", body = null, headers = {}, trigger = 0 }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios({ url, method, data: body, headers });
//         console.log(response)
//         if (isMounted) setData(response.data);
//       } catch (err) {
//         if (isMounted) setError(err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchData();

//     return () => { isMounted = false };
//   }, [url, method, body, headers, trigger]);

//   return { data, loading, error };
// };

// export default useAxios;


import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const useAxios = ({
  url,
  method = "GET",
  body = null,
  headers = {},
  trigger = 0, // manual refetch trigger
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize body and headers to avoid effect reruns
  const memoBody = useMemo(() => body, [JSON.stringify(body)]);
  const memoHeaders = useMemo(() => headers, [JSON.stringify(headers)]);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          data: memoBody,
          headers: memoHeaders,
          signal: controller.signal,
        });

        if (isMounted) {
          // If API wraps data, extract it here
          setData(response.data.data ?? response.data);
        }

        console.log("Fetched data:", response.data.data);
      } catch (err) {
        if (!axios.isCancel(err) && isMounted) {
          setError(err.response?.data || err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort(); // cancel request if component unmounts
    };
  }, [url, method, memoBody, memoHeaders, trigger]); // stable deps

  return { data, loading, error };
};

export default useAxios;
