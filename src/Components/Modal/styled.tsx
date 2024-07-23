import styled from "styled-components";
type Props = {};
export const Warraper = styled.div<Props>`
  .modal-content {
    min-height: 150px;
  }
  .footer-style {
    height: 70px;
    border-top: 1.5px dashed var(--text-color);
    position: relative;
    .footer-btn-style {
      display: flex;
      grid-gap: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .ant-modal-content {
    width: 500px;
    padding: 20px 32px !important;
    background-color: #24265b !important;

    span.anticon {
      svg {
        path {
          fill: white;
        }
      }
    }
    .ant-modal-header {
      background-color: #24265b !important;
      border-bottom: 1.5px dashed var(--text-color);

      .ant-modal-title {
        font-size: 24px;
        color: #ffffff;
        font-family: Inter;
        font-weight: 600;
        line-height: 29.05px;
        padding-bottom: 20px;
      }
    }
    .ant-modal-body {
      .modal-content {
        .project-style {
          margin-top: 8px;
          height: 71px;
          background-color: #14163b;
          display: flex;
          align-items: center;

          .logo-style {
            margin: 15px;
          }
          .modal-project-name-style {
            font-family: Inter;
            font-size: 16px;
            font-weight: 600;
            line-height: 19.36px;
            color: #ffffff;
          }
          .modal-project-value-style {
            font-family: Inter;
            font-size: 16px;
            font-weight: 400;
            line-height: 19.36px;
            color: var(--text-color);
          }
        }
      }
    }
  }
`;
