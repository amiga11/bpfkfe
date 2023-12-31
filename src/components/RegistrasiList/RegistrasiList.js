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

const RegistrasiList = () => {
  const [dataInstitusi, setDataInstitusi] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [jenis, setJenisFaskes] = useState("");
  const [cariData, setCariData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // getAllDataInstitusi();
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
      const response = await axios.get("/apiregfaskeslain/token");
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
        const response = await axios.get("/apiregfaskeslain/token");
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

      await axiosJWT.post('/apiregfaskeslain/bpfk/validasi', param, customConfig)
      // console.log(param)

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

  const changeHandler = (event) => {
    setJenisFaskes(event.target.value)
    console.log('hulaa ' + jenis)

  }

  const getDataInstitusi = async (e) => {
    e.preventDefault();
    try {
      let response;
      // console.log('jinxprolotus ' + jenis)
      if (jenis == '1') {
        response = await axiosJWT.get("/apiregfaskeslain/bpfk/cari?search=" + cariData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } else if (jenis == '2') {
        response = await axiosJWT.get("/apiregfaskeslain/rmc/cari?search=" + cariData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } else {
        response = {
          data: {
            data: []
          }
        }
      }
      setDataInstitusi(response.data.data);
    } catch (error) { }
  };

  const getAllDataInstitusi = async (e) => {
    try {
      let response;
      if (e.target.value == '1') {
        setJenisFaskes(e.target.value)
        response = await axiosJWT.get("/apiregfaskeslain/bpfk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(response.data);
      } else if (e.target.value == '2') {
        setJenisFaskes(e.target.value)
        response = await axiosJWT.get("/apiregfaskeslain/rmc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } else {
        setJenisFaskes("")
        response = {
          data: {
            data: []
          }
        }
      }

      setDataInstitusi(response.data.data);
    } catch (error) { console.log(error); }
  };



  return (
    <div className="gpt3__home section__padding" id="home" style={{ paddingTop: "15px" }}>
      <div className="gpt3__home-content">
        {/* <p>Aplikasi ini membantu mempermudah proses registrasi Balai  Pengujian Fasilitas Kesehatan (BPFK)/ Institusi Pengujian Fasilitas Kesehatan (IPFK), dan Regional Maintenance Center (RMC) / Unit Pemeliharaan Peralatan Kesehatan.</p> */}
        <h1 className="gradient__text" style={{ paddingBottom: "15px" }}>List Faskes yang Sudah Registrasi </h1>
        <div className="gpt3__header-content__input" style={{ width: '80%' }}>
          <h3 style={{ fontSize: '20px', width: '120px' }}>Pilih Jenis Fasyankes : </h3>
          <select name="jenis_faskes_lain_id" id="jenis_faskes_lain_id" onChange={e => getAllDataInstitusi(e)}>
            <option value="">--Pilih Jenis Fasyankes--</option>
            <option value="1">Balai Pengaman Fasilitas Kesehatan / Institusi Pengamanan Fasilitas Kesehatan</option>
            <option value="2">Regional Maintenance Center / Unit Pemeliharaan Peralatan Kesehatan</option>
          </select>
          {/* <button type="submit" className="btn btn-outline-success" style={{
            background: '#21b963',
            border: '2px solid #21b963',
          }}>
            Submit
          </button> */}
        </div>
        <div className="container" style={{ marginTop: "10px" }}>

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
                  placeholder="Cari disini ketik nama instansi"
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
                  <th style={{ width: "15%" }}>Tanggal Registrasi</th>
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
                    "dataInstitusiId": value.id,
                    "jenis_faskes_lain_id": value.jenis_faskes_lain_id
                  }
                  let inp = new Date(value.created_at);
                  let monthIn = '' + (inp.getMonth() + 1)
                  let dayIn = '' + inp.getDate()
                  if (monthIn.length < 2) {
                    monthIn = '0' + monthIn;
                  }

                  if (dayIn.length < 2) {
                    dayIn = '0' + dayIn;
                  }

                  let dateIn = dayIn + '-' + monthIn + '-' + inp.getFullYear();

                  return (

                    <tr key={value.id}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <label htmlFor="">{index + 1}</label>
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle" }}>{dateIn}</td>
                      <td>{value.nama_institusi}</td>
                      <td>{value.jenis_faskes_lain.nama}</td>
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

export default RegistrasiList;