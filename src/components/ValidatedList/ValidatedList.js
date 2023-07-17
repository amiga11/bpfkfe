import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import style from "./validatedList.module.css";
import { HiSaveAs } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { Spinner, Table } from "react-bootstrap";

const ValidatedList = () => {
  const [dataInstitusi, setDataInstitusi] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [jenis, setJenisFaskes] = useState("");
  const [cariData, setCariData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
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
        response = await axiosJWT.get("/apibpfk/bpfkvalidated/cari?search=" + cariData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      } else if (jenis == '2') {
        response = await axiosJWT.get("/apibpfk/rmcvalidated/cari?search=" + cariData,
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
        response = await axiosJWT.get("/apibpfk/bpfkvalidated",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        console.log(response.data);
      } else if (e.target.value == '2') {
        setJenisFaskes(e.target.value)
        response = await axiosJWT.get("/apibpfk/rmcvalidated",
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
        <h1 className="gradient__text" style={{ paddingBottom: "15px" }}>List Faskes yang Sudah di Validasi </h1>
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
                  <th style={{ width: "25%" }}>Tanggal Terbit Kode</th>
                  <th style={{ width: "15%" }}>Kode Instasi</th>
                  <th style={{ width: "30%" }}>Jenis Instansi</th>
                  <th style={{ width: "30%" }}>Nama Instansi</th>
                  <th style={{ width: "20%" }}>Alamat</th>
                  <th style={{ width: "20%" }}>Nama Petugas</th>
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "30%" }}>No Telepon Petugas</th>
                </tr>
              </thead>
              <tbody>
                {dataInstitusi.map((value, index) => {
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
                      <td>{value.data_kode_registrasi.kode_registrasi}</td>
                      <td>{value.jenis_faskes_lain.nama}</td>
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
      </div >
    </div >
  );
};

export default ValidatedList;