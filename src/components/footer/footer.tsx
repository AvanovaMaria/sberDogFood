import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { logo } from '../image/logo';

const Footer = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#FFE44D",
          color: "black",
          width: "1440px",
          height: "194px"
        }}
      >
        <div>
          {logo}
        </div>
        <div>
            <div>Каталог</div>
            <div>Акции</div>
            <div>Новости</div>
            <div>Отзывы</div>
        </div>
        <div>
        <div>Оплата и доставка</div>
        <div>Часто спрашивают</div>
        <div>Обратная связь</div>
        <div>Контакты</div>
        </div>
        <div>
            <h3>Мы на связи</h3>
            <h4>tel</h4>
            <div>dogfood.ru@gmail.com</div>
            <div>
                <span><TelegramIcon fontSize='small' color='disabled' /></span>
                <span><WhatsAppIcon fontSize='small' color='disabled' /></span>
                <span><InstagramIcon fontSize='small' color='disabled' /></span>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
