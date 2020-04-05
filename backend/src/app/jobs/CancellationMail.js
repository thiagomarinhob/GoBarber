import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

export default {
  get Key() {
    return 'CancelletionMail';
  },

  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila executouuu');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.name}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      content: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  },
};
