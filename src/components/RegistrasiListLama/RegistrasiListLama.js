import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import style from "./registrasiList.module.css";
import { HiSaveAs } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { Spinner, Table } from "react-bootstrap";

const RegistrasiListLama = () => {
  const [dataInstitusi, setDataInstitusi] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [cariData, setCariData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAllDataInstitusi();
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

  const postValidation = async (param) => {
    try {
      const customConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      await axiosJWT.post('/apibpfk/validasi', param, customConfig)
      console.log(param)

      alert("Validasi Berhasil, Kode Fasyankes Telah dikirim ke Email Terdaftar");
      // toast('Validasi Berhasil, Kode Fasyankes Telah dikirim ke Email Terdaftar', {
      //   position: toast.POSITION.TOP_RIGHT
      // })
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.log(error)
      alert("Validasi Gagal");

      // toast('Data Gagal Disimpan', {
      //   position: toast.POSITION.TOP_RIGHT
      // })
    }
  }

  const validasi = (param) => {
    confirmAlert({
      title: 'Konfirmasi Validasi Data',
      message: 'Apakah Anda Yakin? ',
      buttons: [
        {
          label: 'Ya',
          onClick: () => {
            postValidation(param)
          }
        },
        {
          label: 'Tidak'
        }
      ]
    })
  }

  const changeHandlerCariData = (event) => {
    setCariData(event.target.value);
  };

  const getDataInstitusi = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.get("/apibpfk/institusi/cari?search=" + cariData,
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

  const getAllDataInstitusi = async (e) => {
    try {
      const response = await axiosJWT.get("/apibpfk/institusi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // console.log(response.data);
      setDataInstitusi(response.data.data);
    } catch (error) { }
  };



  return (
    <div className="gpt3__home section__padding" id="home">
      <div className="gpt3__home-content">
        {/* <p>Aplikasi ini membantu mempermudah proses registrasi Balai  Pengujian Fasilitas Kesehatan (BPFK)/ Institusi Pengujian Fasilitas Kesehatan (IPFK), dan Regional Maintenance Center (RMC) / Unit Pemeliharaan Peralatan Kesehatan.</p> */}
        <h1 className="gradient__text">List Institusi yang Sudah Registrasi </h1>

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
            <form onSubmit={getDataInstitusi}>
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
                  placeholder="Cari disini ketik nama instansi atau jenis instansi"
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
                  <th style={{ width: "30%" }}>Nama Instansi</th>
                  <th style={{ width: "30%" }}>Jenis Instansi</th>
                  <th style={{ width: "20%" }}>Alamat</th>
                  <th style={{ width: "20%" }}>Nama Petugas</th>
                  <th style={{ width: "10%" }}>No Telepon Petugas</th>
                  <th style={{ width: "10%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataInstitusi.map((value, index) => {
                  const param = {
                    "namaInstitusi": value.nama_institusi,
                    "kotaId": '' + value.kota_id,
                    "email": value.email,
                    "dataInstitusiId": value.id
                  }
                  return (

                    <tr key={value.id}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <label htmlFor="">{index + 1}</label>
                      </td>
                      <td>{value.nama_institusi}</td>
                      <td>{value.jenis_user.jenis_user}</td>
                      <td>{value.alamat}</td>
                      <td>{value.nama_pj}</td>
                      <td>{value.no_telp}</td>
                      <td><button size={20} onClick={(e) => validasi(param)}
                        style={{
                          backgroundColor: "#5bb53a",
                          color: "white", cursor: "pointer",
                          marginRight: "5px",
                          width: '100%',
                          background: '#5bb53a',
                          border: '2px solid #5bb53a',
                          padding: '0 1rem',
                          color: '#fff',
                          cursor: 'pointer',
                          outline: 'none',
                          borderTopRightRadius: '5px',
                          borderBottomRightRadius: '5px',
                          borderTopLeftRadius: '5px',
                          borderBottomLeftRadius: '5px'
                        }} type="submit">Validasi</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div >
    </div >
  );
};

export default RegistrasiListLama;