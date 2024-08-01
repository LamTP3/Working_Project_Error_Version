import { useState } from "react";
import axios from "axios";
import "./Table.scss";
import { MoreIcon, ChainIcon } from "../../../Icon";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { ModalName } from "../Modal/ModalType";
import ModalComponents from "../Modal/ModalComponent";
import LogoComp from "../Logo/LogoComp";
import PaginationComponent from "../Pagination/Pagination";
import { Project } from "../../../type/type";
import { formatPrice } from "../../../helper/util";
import { toast } from "react-toastify";
interface TableProps {
  data: Project[];
}

function Table({ data }: TableProps) {
  const [open, setOpen] = useState(false);
  const [modalName, setModalName] = useState<ModalName>("Confirm");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const handleOpen = (modal_name: ModalName) => {
    setOpen(true);
    setModalName(modal_name);
  };

  const handleOk = async (rounds?: any[], rejectReason?: string) => {
    if (selectedProject) {
      let updatedProject = { ...selectedProject };

      if (modalName === "Confirm" && rounds) {
        updatedProject = {
          ...updatedProject,
          capital: { ...updatedProject.capital, rounds },
        };
      } else if (modalName === "Reject" && rejectReason) {
        updatedProject = {
          ...updatedProject,
          statusId: 2,
          reject_reason: rejectReason,
        };
      } else if (modalName === "Delete") {
        try {
          await axios.delete(
            `http://localhost:9999/Project/${selectedProject.id}`
          );
          toast.success("Delete Project Success");
          console.log("Delete success");
          setOpen(false);
          return;
        } catch (error) {
          console.error("Error deleting project:", error);
          return;
        }
      }

      try {
        await axios.put(
          `http://localhost:9999/Project/${selectedProject.id}`,
          updatedProject
        );
        toast.success(`${modalName} Success`);
        console.log(`${modalName} Success`);
      } catch (error) {
        console.error(`Error updating project:`, error);
      }
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
  };

  const handleSelectProject = (item: Project) => {
    setSelectedProject(item);
    console.log(item);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div className="text-[#fff]">View detail</div>,
    },
    {
      key: "2",
      label: (
        <div
          className="text-right text-[#53FF50]"
          onClick={() => {
            handleOpen("Confirm");
          }}
        >
          Approve
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-right text-[#FF5E5E]"
          onClick={() => {
            handleOpen("Reject");
          }}
        >
          Reject
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          className="text-right text-[#F4C349]"
          onClick={() => {
            handleOpen("Delete");
          }}
        >
          Delete
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <ModalComponents
          open={open}
          handleOk={handleOk}
          handleCancel={handleCancel}
          modal_name={modalName}
          data={selectedProject}
        />
      </div>
      <div>
        <table className="table-content">
          <thead>
            <tr>
              <th>Project</th>
              <th>Participants</th>
              <th>Total Raised</th>
              <th>Current Price</th>
              <th>Ath Since Ido</th>
              <th>Ended In</th>
              <th>Chain</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="project-table-style">
                    <div style={{ width: "40px", height: "40px" }}>
                      {item?.basic_information.project_logo ? (
                        <img
                          src={data[0].basic_information.project_logo}
                          width={"100%"}
                          height={"100%"}
                        />
                      ) : (
                        <LogoComp size="small" />
                      )}
                    </div>
                    <div>
                      <div>{item.basic_information.project_name}</div>
                      <div className="table-text">
                        {item.token_information.token_symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td>--</td>
                <td>{formatPrice(item.public_token_sale.total_amount)}</td>
                <td>--</td>
                <td>--</td>
                <td>
                  <div>March 14th 2022</div>
                  <div className="table-text">8:28 AM - UTC</div>
                </td>
                <td>
                  <ChainIcon />
                </td>
                <td>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <Button onClick={() => handleSelectProject(item)}>
                      <MoreIcon />
                    </Button>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <PaginationComponent
          total={data.length}
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Table;
