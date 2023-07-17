import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import style from "./bpfk.module.css";
import { HiSaveAs } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { Spinner, Table } from "react-bootstrap";

const BpfkValidated = () => {
  const [dataInstitusi, setDataInstitusi] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [cariData, setCariData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getDataBpfkValidated();
    // console.log(dataInstitusi);
    // const getLastYear = async () => {
    //   const date = new Date();
    //   return date.getFullYear() - 1;
    // };

    // getRLTigaTitikdelapanTemplate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("/apibpfk/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      // getDataInstitusi();
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("/apibpfk/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );




  const changeHandlerCariData = (event) => {
    setCariData(event.target.value);
  };

  const searchDataBpfk = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.get("/apibpfk/bpfkvalidated/cari?search=" + cariData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // console.log(response.data);
      setDataInstitusi(response.data.data);

      console.log('cek', response.data.data);

    } catch (error) { }
  };

  const getDataBpfkValidated = async (e) => {
    try {
      const response = await axiosJWT.get("/apibpfk/bpfkvalidated",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // console.log(response.data);
      setDataInstitusi(response.data.data);

      console.log('cek', response.data.data);

    } catch (error) { }
  };



  return (
    <div className="gpt3__home section__padding" id="home" style={{ paddingTop: "15px" }}>
      <div className="gpt3__home-content">
        <h1 className="gradient__text">List Faskes BPFK yang Sudah di Validasi </h1>
        {/* <p>Aplikasi ini membantu mempermudah proses registrasi Balai  Pengujian Fasilitas Kesehatan (BPFK)/ Institusi Pengujian Fasilitas Kesehatan (IPFK), dan Regional Maintenance Center (RMC) / Unit Pemeliharaan Peralatan Kesehatan.</p> */}

        <div className="container" style={{ marginTop: "25px" }}>

          <div className="col-md-12">
            <div className="container" style={{ textAlign: "center" }}>
              {/* <h5>test</h5> */}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
              {spinner && <Spinner animation="grow" variant="success"></Spinner>}
            </div>
            <form onSubmit={searchDataBpfk}>
              <div
                className="gpt3__header-content__input"
                style={{ width: "70%", display: "inline-block" }}
              >
                <input
                  name="cariData"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={cariData}
                  onChange={(e) => changeHandlerCariData(e)}
                  placeholder="Cari disini ketik nama instansi atau jenis instansi atau nama petugas"
                />

              </div>
              <div
                className="gpt3__header-content__input"
                style={{ width: "10%", height: "5%", display: "inline-block" }}
              >
                <button type="submit" className="btn btn-outline-success" style={{
                  background: '#828484',
                  border: '2px solid #828484',
                }}>
                  Cari
                </button>
              </div>

            </form>
            <Table
              className={style.rlTable}
              responsive
              striped
              bordered
              style={{ width: "110%" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "4%" }}>No</th>
                  <th style={{ width: "30%" }}>Jenis Instansi</th>
                  <th style={{ width: "15%" }}>Kode Instasi</th>
                  <th style={{ width: "30%" }}>Nama Instansi</th>
                  <th style={{ width: "20%" }}>Alamat</th>
                  <th style={{ width: "20%" }}>Nama Petugas</th>
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "30%" }}>No Telepon Petugas</th>
                </tr>
              </thead>
              <tbody>
                {dataInstitusi.map((value, index) => {

                  return (
                    <tr key={value.id}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <label htmlFor="">{index + 1}</label>
                      </td>
                      <td>{value.jenis_faskes_lain.nama}</td>
                      <td>{value.data_kode_registrasi.kode_registrasi}</td>
                      <td>{value.nama_institusi}</td>
                      <td>{value.alamat}</td>
                      <td>{value.nama_pj}</td>
                      <td>{value.email}</td>
                      <td>{value.contact_person}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BpfkValidated;